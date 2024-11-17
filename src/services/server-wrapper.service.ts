import { NextRequest, NextResponse } from 'next/server';

const serverWrapperService =
    (promiser: any) =>
    async (req: NextRequest, res: NextResponse, next: any) => {
        try {
            const result = await promiser(req, res, next);

            const status = result.status || 200;

            return NextResponse.json(
                { status, data: {}, message: '', success: true, ...result },
                { status }
            );
        } catch (error: any) {
            const status = error.status || 500;
            const message = error.message || 'An unknown error occurred';
            return NextResponse.json(
                { status, data: {}, message, success: false },
                { status }
            );
        }
    };

export default serverWrapperService;
