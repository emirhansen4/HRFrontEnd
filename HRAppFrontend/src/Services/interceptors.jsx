import axios from "axios";


const authorizationHeader = (config) => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    // window.location.href = "/login?error=unouthorize";    
    delete config.headers.common["Authorization"];
  }
};

const isLoginRequest = (config) => {
  return (
    config.url.includes("raw.githubusercontent.com") ||
    config.url.includes("/api/Account")
  );
};

axios.interceptors.request.use(
  (config) => {
    if (!isLoginRequest(config)) {
      authorizationHeader(config);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response && error.response.status === 401)
      window.location.href = "/login?error=unouthorize";    
    return Promise.reject(error);
  }
);
