/* eslint-disable */
window.onload = function () {
  // Load saved auth data from localStorage
  const savedAuth = JSON.parse(localStorage.getItem('swaggerAuth') || '{}');
  console.log('Loaded auth from localStorage:', savedAuth);

  // Create Swagger UI instance
  window.ui = SwaggerUIBundle({
    url: '/api-docs-json', // NestJS Swagger JSON endpoint
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: 'BaseLayout',

    // Configure authorization persistence
    persistAuthorization: true,

    // Automatically set auth from localStorage on Swagger UI load
    onComplete: function () {
      console.log('Swagger UI load complete, applying saved tokens');
      const savedAuth = JSON.parse(localStorage.getItem('swaggerAuth') || '{}');

      if (savedAuth.accessToken || savedAuth.sessionId) {
        console.log('Found saved tokens, applying to Swagger UI');

        if (savedAuth.accessToken) {
          // Set Bearer token in Swagger UI
          window.ui.authActions.authorize({
            'access-token': {
              name: 'access-token',
              schema: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
              },
              value: 'Bearer ' + savedAuth.accessToken,
            },
          });
          console.log('✅ Bearer token applied from localStorage');
        }

        if (savedAuth.sessionId) {
          // Set session ID in Swagger UI
          window.ui.authActions.authorize({
            'session-id': {
              name: 'session-id',
              schema: {
                type: 'apiKey',
                in: 'header',
                name: 'X-Session-Id',
              },
              value: savedAuth.sessionId,
            },
          });
          console.log('✅ Session ID applied from localStorage');
        }
      } else {
        console.log('No saved tokens found in localStorage');
      }
    },

    // Add tokens to every request
    requestInterceptor: (req) => {
      // We don't need to manually add tokens here anymore
      // as they will be added by Swagger UI's built-in authorization
      return req;
    },

    // Save login and refresh token responses automatically
    responseInterceptor: (res) => {
      try {
        // Only process successful responses with JSON content
        if (res.status >= 200 && res.status < 300 && res.text) {
          const response = JSON.parse(res.text);
          const data = response.result;
          console.log(data);

          // Check if this is an auth response (login or refresh)
          console.log(res.url);
          if (
            (res.url.includes('/auth/sign-in-admin') ||
              res.url.includes('/auth/refresh-admin')) &&
            (data.accessToken || data.sessionId)
          ) {
            // Store tokens in localStorage
            localStorage.setItem('swaggerAuth', JSON.stringify(data));
            console.log('✅ Auth data saved to localStorage:', data);

            // Update the Authorize UI with the new tokens
            setTimeout(() => {
              updateSwaggerAuthorization(data);
            }, 500);
          }
        }
      } catch (e) {
        console.error('Failed to process response:', e);
      }

      return res;
    },
  });

  // Wait for Swagger UI to fully initialize before adding custom elements
  const initInterval = setInterval(() => {
    if (window.ui && document.querySelector('.swagger-ui')) {
      clearInterval(initInterval);
      console.log('Swagger UI initialized, adding custom elements');
      setupAuthUI();
    }
  }, 100);

  function setupAuthUI() {
    const topbarEl = document.querySelector('.topbar');
    if (topbarEl) {
      // Create auth status container
      const authStatusEl = document.createElement('div');
      authStatusEl.className = 'auth-status';
      authStatusEl.style.marginLeft = 'auto';
      authStatusEl.style.marginRight = '20px';
      authStatusEl.style.display = 'flex';
      authStatusEl.style.alignItems = 'center';

      // Create status text
      const statusTextEl = document.createElement('span');
      statusTextEl.id = 'auth-status-text';
      statusTextEl.style.marginRight = '10px';

      // Create logout button
      const logoutBtn = document.createElement('button');
      logoutBtn.textContent = 'Clear Auth';
      logoutBtn.className = 'btn';
      logoutBtn.style.padding = '5px 10px';
      logoutBtn.style.backgroundColor = '#f44336';
      logoutBtn.style.color = 'white';
      logoutBtn.style.border = 'none';
      logoutBtn.style.borderRadius = '4px';
      logoutBtn.style.cursor = 'pointer';
      logoutBtn.onclick = () => {
        localStorage.removeItem('swaggerAuth');
        updateAuthStatus();

        // Clear Swagger UI authorizations
        window.ui.authActions.logout();

        alert('Auth data cleared!');
      };

      // Add elements to the DOM
      authStatusEl.appendChild(statusTextEl);
      authStatusEl.appendChild(logoutBtn);
      topbarEl.appendChild(authStatusEl);

      // Update auth status display
      updateAuthStatus();

      // Apply saved tokens to Swagger UI authorization
      if (savedAuth.accessToken || savedAuth.sessionId) {
        console.log('Applying saved auth to Swagger UI');
        setTimeout(() => {
          updateSwaggerAuthorization(savedAuth);
        }, 500);
      }
    }
  }

  // Function to update auth status display
  function updateAuthStatus() {
    const statusEl = document.getElementById('auth-status-text');
    if (!statusEl) {
      console.error('Auth status element not found');
      return;
    }

    const auth = JSON.parse(localStorage.getItem('swaggerAuth') || '{}');
    console.log('Updating auth status with:', auth);

    if (auth.accessToken) {
      statusEl.textContent = '🔐 Authenticated';
      statusEl.style.color = '#4caf50';
    } else {
      statusEl.textContent = '🔒 Not authenticated';
      statusEl.style.color = '#f44336';
    }
  }

  // Function to update Swagger UI authorization with tokens
  function updateSwaggerAuthorization(authData) {
    console.log('Updating Swagger UI authorization with:', authData);

    if (!window.ui || !window.ui.authActions) {
      console.error('Swagger UI not initialized yet');
      return;
    }

    if (authData.accessToken) {
      // Set Bearer token in Swagger UI
      window.ui.authActions.authorize({
        'access-token': {
          name: 'access-token',
          schema: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
          },
          value: 'Bearer ' + authData.accessToken,
        },
      });
      console.log('✅ Bearer token set in Swagger UI');
    }

    if (authData.sessionId) {
      // Set session ID in Swagger UI
      window.ui.authActions.authorize({
        'session-id': {
          name: 'session-id',
          schema: {
            type: 'apiKey',
            in: 'header',
            name: 'X-Session-Id',
          },
          value: authData.sessionId,
        },
      });
      console.log('✅ Session ID set in Swagger UI');
    }

    // Update status display
    updateAuthStatus();
  }
};
