// Generated by gen.mjs @ 2022-07-06T14:15:43.085Z - avoid editing this file by hand! 
import * as zod from 'zod';
import { BaseSchema } from '../BaseSchema';
import { ZodValidator } from '../messaging/MessageValidator';
import { UserValidators } from "../user/UserValidators";

export namespace FileValidators {

    import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
    import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;
    import ZUser = UserValidators.ZUser;

    export const ZFile = zod.object({
        id: zod.string()
            .describe("The unique ID of the file"),
        name: zod.string()
            .describe("The human readable name of the file - this is user chosen and does not need to be the actual file name"),
        filename: zod.string()
            .describe("The original file name"),
        size: zod.number()
            .describe("The number of bytes in the file"),
        mime: zod.string()
            .describe("The mime type of the file to be used in download requests"),
        owner: ZUser
            .describe("The owner of this file, originally the user who uploaded it"),
        type: zod.string()
            .describe("The type of file"),
        date: zod.number()
            .describe("The unix-second timestamp when the file was uploaded"),
        downloadURL: zod.string()
            .describe("The URL at which the file can be downloaded if it is stored at an external location"),
        checksum: zod.string()
            .describe("The checksum of the file"),
    });
    export type FileRepresentation = zod.infer<typeof ZFile>;
    export const ZFileShallow = zod.object({		id: zod.string()
            .describe("The unique ID of the file"),
        name: zod.string()
            .describe("The human readable name of the file - this is user chosen and does not need to be the actual file name"),
        filename: zod.string()
            .describe("The original file name"),
        size: zod.number()
            .describe("The number of bytes in the file"),
        mime: zod.string()
            .describe("The mime type of the file to be used in download requests"),
        owner: zod.string()
            .describe("The owner of this file, originally the user who uploaded it"),
        type: zod.string()
            .describe("The type of file"),
        date: zod.number()
            .describe("The unix-second timestamp when the file was uploaded"),
        downloadURL: zod.string()
            .describe("The URL at which the file can be downloaded if it is stored at an external location"),
        checksum: zod.string()
            .describe("The checksum of the file"),
    });
    export type FileShallowRepresentation = zod.infer<typeof ZFileShallow>;
    export const ZFileRead = REQUEST_CORE_SCHEMA('READ').extend({
        id: zod.array(zod.string())
            .optional()
            .describe("The unique ID of the file"),
        name: zod.string()
            .optional()
            .describe("The human readable name of the file - this is user chosen and does not need to be the actual file name"),
        filename: zod.string()
            .optional()
            .describe("The original file name"),
        size: zod.object({
            greater: zod.number(),
            less: zod.number(),
        }).or(zod.number())
            .optional()
            .describe("The number of bytes in the file"),
        mime: zod.string()
            .optional()
            .describe("The mime type of the file to be used in download requests"),
        owner: zod.string()
            .optional()
            .describe("The owner of this file, originally the user who uploaded it"),
        type: zod.string()
            .optional()
            .describe("The type of file"),
        date: zod.object({
            greater: zod.number(),
            less: zod.number(),
        }).or(zod.number())
            .optional()
            .describe("The unix-second timestamp when the file was uploaded"),
        downloadURL: zod.string()
            .optional()
            .describe("The URL at which the file can be downloaded if it is stored at an external location"),
        checksum: zod.string()
            .optional()
            .describe("The checksum of the file"),
    });
    export type FileRead = zod.infer<typeof ZFileRead>;

    export const ZFileCreate = REQUEST_CORE_SCHEMA('CREATE').extend({
        name: zod.string()
            .describe("The human readable name of the file - this is user chosen and does not need to be the actual file name"),
        filename: zod.string()
            .describe("The original file name"),
        size: zod.number()
            .describe("The number of bytes in the file"),
        mime: zod.string()
            .describe("The mime type of the file to be used in download requests"),
        owner: zod.string()
            .describe("The owner of this file, originally the user who uploaded it"),
        type: zod.string()
            .describe("The type of file"),
        date: zod.number()
            .describe("The unix-second timestamp when the file was uploaded"),
        downloadURL: zod.string()
            .describe("The URL at which the file can be downloaded if it is stored at an external location"),
        checksum: zod.string()
            .describe("The checksum of the file"),
    });
    export type FileCreate = zod.infer<typeof ZFileCreate>;

    export const ZFileUpdate = REQUEST_CORE_SCHEMA('UPDATE').extend({
        id: zod.string()
            .describe("The unique ID of the file"),
        name: zod.string()
            .optional()
            .describe("The human readable name of the file - this is user chosen and does not need to be the actual file name"),
        filename: zod.string()
            .optional()
            .describe("The original file name"),
        size: zod.number()
            .optional()
            .describe("The number of bytes in the file"),
        mime: zod.string()
            .optional()
            .describe("The mime type of the file to be used in download requests"),
        owner: zod.string()
            .optional()
            .describe("The owner of this file, originally the user who uploaded it"),
        type: zod.string()
            .optional()
            .describe("The type of file"),
        date: zod.number()
            .optional()
            .describe("The unix-second timestamp when the file was uploaded"),
        downloadURL: zod.string()
            .optional()
            .describe("The URL at which the file can be downloaded if it is stored at an external location"),
        checksum: zod.string()
            .optional()
            .describe("The checksum of the file"),
    });
    export type FileUpdate = zod.infer<typeof ZFileUpdate>;

    export const ZFileDelete = REQUEST_CORE_SCHEMA('DELETE').extend({
        id: zod.string()
            .describe("The unique identifier of this entity to remove"),
    });
    export type FileDelete = zod.infer<typeof ZFileDelete>;
    const ZFileReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
        result:zod.array(ZFile)
            .describe('The array of matched entries'),
    });
    export type FileReadResponse = zod.infer<typeof ZFileReadResponse>;

    const ZFileShallowReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
        result:zod.array(ZFileShallow)
            .describe('The shallow array of matched entries'),
    });

    const ZFileModifyResponse = RESPONSE_CORE_SCHEMA(['READ', 'CREATE', 'UPDATE', 'DELETE']).extend({
        result: zod.array(zod.string())
            .describe('The array of matched or manipulated responses'),
        uploadURI: zod.string()
            .optional()
            .describe("optional upload URI on create responses")
    });
    export type FileModifyResponse = zod.infer<typeof ZFileModifyResponse>;

    const ZFileResponse = ZFileReadResponse.or(ZFileShallowReadResponse).or(ZFileModifyResponse)
    export type FileResponse = zod.infer<typeof ZFileResponse>;

    export type FileMessage =
        FileRead
        | FileCreate
        | FileUpdate
        | FileDelete;

    export const ZFileRequest = ZFileRead
        .or(ZFileCreate)
        .or(ZFileUpdate)
        .or(ZFileDelete);
    export type FileRequest = zod.infer<typeof ZFileRequest>;

    export class FileMessageValidator extends ZodValidator {

        constructor() {
            super(ZFileRequest);
        }

    }

    export class FileResponseValidator extends ZodValidator {

        constructor() {
            super(ZFileResponse);
        }

    }


}