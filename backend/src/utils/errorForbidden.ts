export function errorForbidden(message?: string): never {
  const errorMsg = message || 'Forbidden';
 
  // throw error forbidden 403
    const error = new Error(errorMsg);
    error.name = 'ForbiddenError';
    error['statusCode'] = 403;  
    error['status'] = 403;
    error['message'] = errorMsg;
    error['error'] = 'Forbidden';

    // throw error
    throw error;
}
