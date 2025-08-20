/**
 * Token Management Utility
 * Separated from axios instance to avoid circular dependencies
 */

export const tokenManager = {
  // Get access token from storage
  getToken: () => {
    const token = sessionStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  },
  
  // Get refresh token from storage
  getRefreshToken: () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    return refreshToken ? JSON.parse(refreshToken) : null;
  },
  
  // Store tokens in session storage
  setTokens: (accessToken, refreshToken = null) => {
    sessionStorage.setItem('token', JSON.stringify(accessToken));
    if (refreshToken) {
      sessionStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    }
  },
  
  // Clear all tokens from storage
  clearTokens: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
  },
  
  // Check if both tokens exist
  hasValidTokens: () => {
    return !!(tokenManager.getToken() && tokenManager.getRefreshToken());
  },

  // Check if user is authenticated (has tokens)
  isAuthenticated: () => {
    return tokenManager.hasValidTokens();
  },

  // Validate token format (basic JWT validation)
  isValidTokenFormat: (token) => {
    if (!token || typeof token !== 'string') return false;
    
    // JWT should have 3 parts separated by dots
    const parts = token.split('.');
    return parts.length === 3;
  },

  // Decode JWT token payload (basic implementation)
  decodeToken: (token) => {
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.warn('Error decoding token:', error);
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: (token = null) => {
    const tokenToCheck = token || tokenManager.getToken();
    if (!tokenToCheck) return true;
    
    const decoded = tokenManager.decodeToken(tokenToCheck);
    if (!decoded || !decoded.exp) return false;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  },

  // Get user info from current token
  getUserInfo: () => {
    const token = tokenManager.getToken();
    return tokenManager.decodeToken(token);
  }
};

export default tokenManager; 