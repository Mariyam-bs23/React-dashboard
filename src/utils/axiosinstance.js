import axios from 'axios';
import tokenManager from './tokenManager';

// Create axios instance with base configuration
const axiosinstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

// Helper function to process queued requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Enhanced refresh token function with better error handling
const refreshToken = async () => {
  try {
    const refreshTokenValue = tokenManager.getRefreshToken();
    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }

    // Validate refresh token format
    if (!tokenManager.isValidTokenFormat || !tokenManager.isValidTokenFormat(refreshTokenValue)) {
      throw new Error('Invalid refresh token format');
    }

    console.log('Attempting to refresh token...');
    
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
      refreshToken: refreshTokenValue
    });

    const { access_token, refresh_token } = response.data;
    
    if (!access_token) {
      throw new Error('No access token in refresh response');
    }
    
    // Store new tokens using token manager
    tokenManager.setTokens(access_token, refresh_token);
    
    console.log('Token refreshed successfully');
    return access_token;
    
  } catch (error) {
    console.error('Token refresh failed:', error);
    
    // Clear tokens on refresh failure
    tokenManager.clearTokens();
    
    // Only redirect if we're not already on the login page
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      console.warn('Redirecting to login due to refresh failure');
      window.location.href = '/login';
    }
    
    throw error;
  }
};

// Auth utilities for axios instance use
export const axiosAuthUtils = {
  // Check if request needs authentication
  needsAuth: (config) => {
    // Skip auth for auth endpoints
    const authEndpoints = ['/auth/signin', '/auth/signup', '/auth/refresh'];
    return !authEndpoints.some(endpoint => config.url?.includes(endpoint));
  },

  // Check if error should trigger token refresh
  shouldRefreshToken: (error) => {
    return error.response?.status === 401 && !error.config?._retry;
  },

  // Handle authentication errors
  handleAuthError: (error) => {
    if (error.response?.status === 401) {
      console.warn('Authentication error detected');
      return true;
    }
    return false;
  },

  // Get current authentication status
  getAuthStatus: () => {
    return {
      isAuthenticated: tokenManager.isAuthenticated(),
      hasValidTokens: tokenManager.hasValidTokens(),
      isTokenExpired: tokenManager.isTokenExpired(),
      needsRefresh: tokenManager.isTokenExpired() && !!tokenManager.getRefreshToken()
    };
  }
};

// Request interceptor to add the Bearer token to all requests
axiosinstance.interceptors.request.use(
  (config) => {
    // Skip adding token for auth endpoints that don't need it
    if (!axiosAuthUtils.needsAuth(config)) {
      return config;
    }

    // Get token using token manager
    const token = tokenManager.getToken();
    
    if (token) {
      // Validate token format before using (if available)
      if (!tokenManager.isValidTokenFormat || tokenManager.isValidTokenFormat(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('Invalid token format detected, clearing tokens');
        tokenManager.clearTokens();
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosinstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and we haven't already tried to refresh
    if (axiosAuthUtils.shouldRefreshToken(error)) {
      // Don't try to refresh if we don't have a refresh token
      if (!tokenManager.getRefreshToken()) {
        console.warn('No refresh token available for 401 error');
        tokenManager.clearTokens();
        
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosinstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        processQueue(null, newToken);
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosinstance(originalRequest);
        
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other authentication errors
    if (axiosAuthUtils.handleAuthError(error)) {
      // Auth error was handled, you can add additional logic here
    }

    // For other errors or if refresh failed
    return Promise.reject(error);
  }
);

// Export token manager for use in other files
export { tokenManager };

export default axiosinstance; 