import { UserLogin } from "../interfaces/UserLogin";

const login = async (loginData: UserLogin) => {
  try {
    console.log('Login attempt with data:', loginData);

    const response = await fetch('/api/auth/login', {  // Changed from '/auth/login' to '/api/auth/login'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    console.log('Login Response:', {
      status: response.status,
      statusText: response.statusText
    });

    // Try to parse response body even for error responses
    const responseBody = await response.json();

    if (!response.ok) {
      // More detailed error logging
      console.error('Login error response:', {
        status: response.status,
        body: responseBody
      });

      throw new Error(
        responseBody.message || 
        `Login failed: ${response.status} ${response.statusText}`
      );
    }

    return responseBody;

  } catch (err) {
    // Improved error logging
    console.error('Login error:', err);
    
    // Distinguish between different types of errors
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('Could not fetch user info');
    }
  }
};

export { login };