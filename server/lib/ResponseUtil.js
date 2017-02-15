/**
 * Created by Administrator on 2017/2/15.
 */
class ResponseUtil {
    constructor(result, error) {
        return {
            result: result,
            error: error
        }
    }
}
module.exports = ResponseUtil;