import { useState } from 'react';
import tokenManager from './tokenManager';

/**
 * Authentication utilities that can be used throughout the app
 * including in axios interceptors
 */
export const authUtils = {
  /**
   * Check if user is currently authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return tokenManager.isAuthenticated();
  },

  /**
   * Login user by storing tokens
   * @param {string} accessToken 
   * @param {string} refreshToken 
   */
  login: (accessToken, refreshToken) => {
    tokenManager.setTokens(accessToken, refreshToken);
  },

  /**
   * Logout user by clearing tokens and optionally redirecting
   * @param {string} redirectPath - Path to redirect after logout (default: '/login')
   * @param {boolean} shouldRedirect - Whether to redirect (default: true)
   */
  logout: (redirectPath = '/login', shouldRedirect = true) => {
    tokenManager.clearTokens();
    
    if (shouldRedirect && window.location.pathname !== redirectPath) {
      window.location.href = redirectPath;
    }
  },

  /**
   * Get current user's access token
   * @returns {string|null}
   */
  getToken: () => {
    return tokenManager.getToken();
  },

  /**
   * Get current user's refresh token
   * @returns {string|null}
   */
  getRefreshToken: () => {
    return tokenManager.getRefreshToken();
  },

  /**
   * Redirect to login if not authenticated
   * @param {string} loginPath - Path to login page (default: '/login')
   * @returns {boolean} - Returns true if authenticated, false if redirected
   */
  requireAuth: (loginPath = '/login') => {
    if (!authUtils.isAuthenticated()) {
      console.warn('Authentication required, redirecting to login');
      authUtils.logout(loginPath);
      return false;
    }
    return true;
  },

  /**
   * Get user information from current token
   * @returns {object|null}
   */
  getUserInfo: () => {
    return tokenManager.getUserInfo();
  },

  /**
   * Check if current token is expired
   * @returns {boolean}
   */
  isTokenExpired: () => {
    return tokenManager.isTokenExpired();
  },

  /**
   * Check if user should be redirected based on authentication state
   * @param {string} currentPath - Current route path
   * @param {array} publicPaths - Array of public paths that don't require auth
   * @returns {string|null} - Returns redirect path or null
   */
  getRedirectPath: (currentPath, publicPaths = ['/login', '/register', '/']) => {
    const isAuthenticated = authUtils.isAuthenticated();
    const isPublicPath = publicPaths.includes(currentPath);

    // If not authenticated and trying to access protected route
    if (!isAuthenticated && !isPublicPath) {
      return '/login';
    }

    // If authenticated and trying to access login page
    if (isAuthenticated && currentPath === '/login') {
      return '/dashboard';
    }

    return null;
  },

  /**
   * Handle authentication error (used in axios interceptors)
   * @param {object} error - The error object
   * @returns {boolean} - Returns true if error was handled
   */
  handleAuthError: (error) => {
    if (error.response?.status === 401) {
      console.warn('Authentication failed, clearing tokens');
      authUtils.logout();
      return true;
    }
    return false;
  },

  /**
   * Store tokens from login response
   * @param {object} loginResponse - Response from login API
   */
  handleLoginResponse: (loginResponse) => {
    const { access_token, refresh_token } = loginResponse.data;
    
    if (access_token) {
      authUtils.login(access_token, refresh_token);
      return true;
    }
    
    console.error('No access token in login response');
    return false;
  },

  /**
   * Validate token format (basic JWT validation)
   * @param {string} token - Token to validate
   * @returns {boolean}
   */
  isValidTokenFormat: (token) => {
    if (!token || typeof token !== 'string') return false;
    
    // JWT should have 3 parts separated by dots
    const parts = token.split('.');
    return parts.length === 3;
  },

  /**
   * Get authorization header value
   * @returns {string|null}
   */
  getAuthHeader: () => {
    const token = authUtils.getToken();
    return token ? `Bearer ${token}` : null;
  },

  /**
   * Check if refresh is needed (token expired but refresh token exists)
   * @returns {boolean}
   */
  needsRefresh: () => {
    const hasRefreshToken = !!authUtils.getRefreshToken();
    const isExpired = authUtils.isTokenExpired();
    
    return hasRefreshToken && isExpired;
  }
};

/**
 * Higher-order component for route protection
 * Usage: const ProtectedComponent = withAuth(YourComponent);
 */
export const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    if (!authUtils.requireAuth()) {
      return null; // Will redirect, so don't render anything
    }
    
    return <WrappedComponent {...props} />;
  };
};

/**
 * React hook for authentication state
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authUtils.isAuthenticated());

  const login = (accessToken, refreshToken) => {
    authUtils.login(accessToken, refreshToken);
    setIsAuthenticated(true);
  };

  const logout = (redirectPath, shouldRedirect = true) => {
    authUtils.logout(redirectPath, shouldRedirect);
    setIsAuthenticated(false);
  };

  const checkAuth = () => {
    const authStatus = authUtils.isAuthenticated();
    setIsAuthenticated(authStatus);
    return authStatus;
  };

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth,
    getUserInfo: authUtils.getUserInfo,
    requireAuth: authUtils.requireAuth,
    isTokenExpired: authUtils.isTokenExpired,
    getToken: authUtils.getToken
  };
};

export default authUtils; 