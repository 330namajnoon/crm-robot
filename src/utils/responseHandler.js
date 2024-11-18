const mime = require("mime-types");

const successResponse = (res, data, message = "Operación exitosa", statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

const errorResponse = (res, message = "Ocurrió un error", statusCode = 500, details = null) => {
    const response = {
        success: false,
        message,
        details,
    };

    return res.status(statusCode).json(response);
};

const fileSender = (res, filePath) => {
    const fileType = mime.lookup(filePath);
    return res.status(200)
        .setHeader("Content-Type", fileType)
        .setHeader("Content-Disposition", `attachment; filename=${filePath.split("/").pop()}`)
        .sendFile(filePath, (error) => {
            if (error) return errorResponse(res, error, 404, error?.message || error);
        });
};

module.exports = {
    successResponse,
    errorResponse,
    fileSender,
};
