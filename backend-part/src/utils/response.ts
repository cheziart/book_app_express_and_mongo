import { Response } from "express";
import { ProcessingOptions } from "../types/response.types";

export const customResponses = {
    ok: <T = any>(response: Response, body: T,  message?: string) => {
        response.status(200).json({
            process: ProcessingOptions.Success,
            body,
            message
        })
    },
    badRequest: <T = any>(
        response: Response, 
        message?: string, 
        body?: T) => {
        response.status(400).json({
            process: ProcessingOptions.Failed,
            message,
            body: body || null,
        })
    },
    notAuthorized: (response: Response) => {
        response.status(401).json({
            process: ProcessingOptions.Failed,
            message: 'Not authorized'
        })
    },
    forbidden: (
        response: Response,
        message?: string
    ) => {
        response.status(403).json({
            process: ProcessingOptions.Failed,
            message: message || 'Forbidden',
        })
    },
    notFound: (
        response: Response,
        message?: string, 
    ) => {
        response.status(404).json({
            process: ProcessingOptions.Failed,
            message: message || 'Not found',
        })
    },
    serverError: (
        response: Response,
        message?: string, 
    ) => {
        response.status(500).json({
            process: ProcessingOptions.Failed,
            message: message || 'Server error',
        })
    },
}