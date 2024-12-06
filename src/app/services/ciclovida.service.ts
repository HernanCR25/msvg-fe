import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CicloVida } from '../models/CicloVida';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CicloVidaService {
  private urlEndPoint: string = 'https://8080-vallegrandeas-lifecycle-t2k1g8or77u.ws-us117.gitpod.io/cicloVida';

  constructor(private http: HttpClient) {}

  update(cicloVida: CicloVida): Observable<CicloVida> {
    const url = `${this.urlEndPoint}/update/${cicloVida.id}`;
    return this.http
      .put<CicloVida>(url, cicloVida)
      .pipe(catchError(this.handleError));
  }

  getCycles(): Observable<CicloVida[]> {
    return this.http
      .get<CicloVida[]>(this.urlEndPoint)
      .pipe(catchError(this.handleError));
  }

  getInactiveCycles(): Observable<CicloVida[]> {
    const url = `${this.urlEndPoint}/inactivos`;
    return this.http.get<CicloVida[]>(url).pipe(catchError(this.handleError));
  }

  create(cicloVida: CicloVida): Observable<CicloVida> {
    return this.http
      .post<CicloVida>(`${this.urlEndPoint}/create`, cicloVida)
      .pipe(catchError(this.handleError));
  }

  getCycle(id: number): Observable<CicloVida> {
    return this.http
      .get<CicloVida>(`${this.urlEndPoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  activate(cicloVida: CicloVida): Observable<CicloVida> {
    const url = `${this.urlEndPoint}/activar/${cicloVida.id}`;
    return this.http.put<CicloVida>(url, {}).pipe(catchError(this.handleError));
  }

  delete(id: number | null): Observable<void> {
    if (id === null) {
      return throwError('El ID no puede ser null');
    }

    // Crear el objeto de datos necesario para el PUT, en caso de que sea necesario
    const data = { status: 'I' }; // Esto depende de la estructura que espera tu backend

    return this.http
      .put<void>(`${this.urlEndPoint}/inactivar/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  deletePhysically(id: number | null): Observable<CicloVida> {
    if (id === null) {
      return throwError('El ID no puede ser null');
    }
    return this.http
      .delete<CicloVida>(`${this.urlEndPoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    // Agregar detalles del error para depuración
    console.error('Error al hacer la solicitud', error);
    if (error.status === 0) {
      return throwError('No se puede conectar al servidor');
    } else {
      return throwError(
        error.error?.message || 'Ocurrió un error, por favor intente de nuevo'
      );
    }
  }
}
