import { generateApi } from 'swagger-typescript-api';
import * as path from 'path';

(async () => {

    await generateApi({
        fileName: 'typing.ts',
        output: path.resolve(process.cwd(), './src/generated'),
        url: "http://localhost:3000/swagger.json",
        httpClientType: 'axios',
        generateClient: true,
        generateResponses: true,
        unwrapResponseData: true,
        sortTypes: true,
    });
})();
