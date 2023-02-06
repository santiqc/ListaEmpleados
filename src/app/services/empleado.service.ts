import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private fb: AngularFirestore) { }

  public async addEmpleado(empleado: any):Promise<any>{
    return await this.fb.collection('empleados').add(empleado);
  }
}
