import jwt from 'jsonwebtoken';
// Middleware function to check if the user is authenticated


// wants to like a post
// click the like button => we go to auth middleware then calls for next (NEXT) => go to like controller...
// auth middleware to check if the user is authenticated

const auth = async (req, res, next) => {
    try {
        // Get the token from the headers
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        // Verify the token
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;