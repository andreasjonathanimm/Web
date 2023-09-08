const autoBind = require('auto-bind');

class AuthenticationsHandler {
  constructor(
    authenticationsService, usersService, tokenManager, authenticationsValidator, usersValidator,
  ) {
    this.authenticationsService = authenticationsService;
    this.usersService = usersService;
    this.tokenManager = tokenManager;
    this.authenticationsValidator = authenticationsValidator;
    this.usersValidator = usersValidator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    this.usersValidator.validatePostUserPayload(request.payload);
    const { username, password, fullname } = request.payload;

    const userId = await this.usersService.addUser({ username, password, fullname });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

  async postAuthenticationHandler(request, h) {
    this.authenticationsValidator.validatePostAuthenticationPayload(request.payload);
    const { username, password } = request.payload;

    const id = await this.usersService.verifyUserCredential(username, password);

    const accessToken = this.tokenManager.generateAccessToken({ id });
    const refreshToken = this.tokenManager.generateRefreshToken({ id });

    await this.authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request, h) {
    this.authenticationsValidator.validatePutAuthenticationPayload(request.payload);

    const { refreshToken } = request.payload;

    await this.authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = this.tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this.tokenManager.generateAccessToken({ id });

    const response = h.response({
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    });
    response.code(200);
    return response;
  }

  async deleteAuthenticationHandler(request, h) {
    this.authenticationsValidator.validateDeleteAuthenticationPayload(request.payload);

    const { refreshToken } = request.payload;

    await this.authenticationsService.verifyRefreshToken(refreshToken);
    await this.authenticationsService.deleteRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = AuthenticationsHandler;
