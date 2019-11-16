const authenticationHeader = {
    'Content-Type': 'json',
    'Access-Control-Allow-Credentials': 'true',
    'Authorization': process.env.REACT_APP_CLIENT_TOKEN || ''
};

export default authenticationHeader;