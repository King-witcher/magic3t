module.exports = class AbstractController {
    
    static responseError(res, status, message){
        return res.status(status).json(
            {
                'success': false,
                'message': message,
                'payload': null
            }
        );
    }

    static response(res, payload){
        return res.json(
            {
                'success': true,
                'message' : '',
                'payload' : payload
            }
        );
    }
}