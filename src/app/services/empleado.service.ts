import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private fb: AngularFirestore) {}

  public async addEmpleado(empleado: any): Promise<any> {
    return await this.fb.collection('empleados').add(empleado);
  }

  public async getEmpleados():Promise<[]>{
    return new Promise((resolve, reject) => {
      this.fb
        .collection('empleados', ref => ref.orderBy('fechaCreacion', 'desc'))
        .snapshotChanges()
        .subscribe({
          next: (data: any) => {
            const returnData: any = [];
            data.forEach((element: any) => {
              returnData.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data(),
              });
            });
            resolve(returnData);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  public async deleteEmpleado(id:string):Promise<any>{
    return await this.fb.collection('empleados').doc(id).delete();
  }

  public async updateEmpleado(id:string,empleado:any):Promise<any>{
    return await this.fb.collection('empleados').doc(id).update(empleado)
  }
}
