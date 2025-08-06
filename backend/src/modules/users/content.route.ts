import fastify, { FastifyInstance } from "fastify";
import fs from 'fs/promises'
import pump from 'pump'
import fastifyMultipart from '@fastify/multipart'
import { FastifyError } from "fastify";
import { pipeline } from "stream/promises";
import { fileTypeFromBuffer } from "file-type";
import path from "path";

export const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024;

export async function contentRoutes(app: FastifyInstance) {
  app.post('/content', async function (req, reply) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

    try {
      const contentDirectory = './content';

      try {
        await fs.access(contentDirectory);
      } catch {
        await fs.mkdir(contentDirectory, { recursive: true });
      }

      const files = await req.files();
      const uploadedFiles: string[] = [];
      const errors: string[] = [];

      for await (const part of files) {
        try {
          if (!part.filename) {
            errors.push('l\'allegato deve avere un nome');
            continue;
          }

          const sanitizedFilename = path.basename(part.filename);

          if (!sanitizedFilename || sanitizedFilename !== part.filename) {
            errors.push(`nome dell'allegato non valido: ${part.filename}`);
            continue;
          }

          const fileExtension = path.extname(sanitizedFilename).toLowerCase().slice(1);

          if (!allowedExtensions.includes(fileExtension)) {
            errors.push(`estensione non valida: ${fileExtension}; sono supportate le seguenti: ${allowedExtensions.join(', ')}`);
            continue;
          }

          if (!part.mimetype || !allowedMimeTypes.includes(part.mimetype)) {
            errors.push(`tipo MIME non valido: ${part.mimetype}; sono supportati i seguenti: ${allowedMimeTypes.join(', ')}`);
            continue;
          }

          const chunks: Buffer[] = [];
          let totalSize = 0;

          for await (const chunk of part.file) {
            totalSize += chunk.length;

            if (totalSize > MAX_FILE_SIZE) {
              errors.push(`l'allegato ${sanitizedFilename} supera il peso massimo di ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
              break;
            }

            chunks.push(chunk);
          }

          if (totalSize > MAX_FILE_SIZE) {
            continue;
          }

          const fileBuffer = Buffer.concat(chunks);

          const detectedType = await fileTypeFromBuffer(fileBuffer);

          if (!detectedType) {
            errors.push(`impossibile rilevare il tipo dell'allegato ${sanitizedFilename}`);
            continue;
          }

          if (!allowedMimeTypes.includes(detectedType.mime)) {
            errors.push(`i "numeri magici" dell'allegato ${sanitizedFilename} non sono validi; tipo mime rilevato: ${detectedType.mime}`);
            continue;
          }

          if (part.mimetype !== detectedType.mime) {
            errors.push(`il tipo MIME dell'header (${part.mimetype}) dell'allegato ${sanitizedFilename} non combacia con quello rilevato (${detectedType.mime})`);
            continue;
          }

          await fs.writeFile(path.join(contentDirectory, sanitizedFilename), fileBuffer);

          uploadedFiles.push(sanitizedFilename);
        } catch (e) {
          console.error(`errore durante l'elaborazione dell'allegato ${part.filename}: `, e);
          errors.push(`errore durante l'elaborazione dell'allegato ${part.filename}: ${e instanceof Error ? e.message : 'errore sconosciuto'}`);
        }
      }

      if (errors.length > 0 && uploadedFiles.length === 0) {
        return reply.code(400).send({
          success: false,
          message: 'nessun allegato è stato caricato con successo',
          errors,
          uploadedFiles: []
        });
      }

      return {
        success: true,
        message: 'caricamento effettuato con successo',
        uploadedFiles,
        erros: errors.length > 0 ? errors : undefined
      };
    } catch (e) {
      console.error('errore durante il caricamento: ', e);

      return reply.code(500).send({
        success: false,
        message: 'errore interno del server durante il caricamento dei file',
        error: e instanceof Error ? e.message : 'errore sconosciuto'
      });
    }
  });
}