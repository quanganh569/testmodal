import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { Employee } from 'src/app/Data-Services/Model/Employee';
import { DataService } from 'src/app/Data-Services/data.service';
// import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 5;
  public lstEMP: Employee[] = [];
  public Avatar: any;
  public Name: string;
  public Email: string;
  public Phone: string;
  public Address: string;
  public id: any;
  modalRef: BsModalRef;
  searchText;

  public imagePath;
  imgURL: any;

  // formCreate: FormGroup;

  constructor(
    private _acRouter: ActivatedRoute,
    private modalService: BsModalService,
    private _data: DataService,
    private _router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    //  this.id=this._acRouter.snapshot.params["id"]
    console.log(this.id); //undefined

  }


  ngOnInit() {
    this.getAPI();
   

  }
  absoluteIndex(indexOnPage: number, ): number {
    return this.itemsPerPage * (this.currentPage - 1) + indexOnPage;
  }
  getAPI() {
    this._data.getAPI().subscribe(data => { this.lstEMP = data; },
      error => {
        console.log(error);
      })
  }
  // Function Create + Update chung nhau
  createAPI(formCreate) {
    const data = {
      "Avatar": this.Avatar,
      "Name": this.Name,
      "Email": this.Email,
      "Phone": this.Phone,
      "Address": this.Address,
    }

    if (this.id) {
      this._data.updateAPI(this.id, data).subscribe(data => {
        // alert("Cap nhat thanh cong")
        this.toastr.success("Nhân viên " + this.Name , " Cập nhật thành công");
        this.getAPI();
        this.modalRef.hide();//Ẩn modal sau khi xong event
      }, error => {
        this.toastr.error("Nhân viên " + this.Name , " Cập nhật thất bại");

      })
    }
    else {
      this._data.createAPI(data).subscribe(data => {
        // alert("Thêm thành công")
        this.toastr.success('Nhân viên ' + this.Name , ' Thêm thành công')
        this.getAPI();
        this.modalRef.hide();//Ẩn modal sau khi xong event
      }, error => {
        this.toastr.error("Nhân viên " + this.Name , " Thêm thất bại");

      })
    }
  }


  //Function Chi tiet 
  detailEmployee(id) {
    // this.id=id;
    this._data.detailAPI(id).subscribe((res: any) => {
      // console.log(res)
      this.Avatar = res.Avatar;
      this.Name = res.Name;
      this.Phone = res.Phone;
      this.Email = res.Email;
      this.Address = res.Address;
    })
  }

  //Function Xoa
  deleteEmployee() {
    this._data.deleteAPI(this.id).subscribe(res => {
      console.log(res);
      this.toastr.success('Đã xóa nhân viên ' + this.Name, ' Xóa thành công')
      this.getAPI();
      this.modalRef.hide();//Ẩn modal sau khi xong event
    }, err => {
      console.log(err);
      this.toastr.error('Chưa xóa nhân viên ' + this.Name, ' Xóa thất bại')
    })
  }


  openModal(template: TemplateRef<any>) {
    this.id = "";;
    this.Avatar = "";
    this.Name = "";
    this.Phone = "";
    this.Email = "";
    this.Address = "";
    this.modalRef = this.modalService.show(template);
  }
  openEdit(template: TemplateRef<any>, id: string) {
    // this._router.navigateByUrl(`${id}`);
    this.id = id;
    this.detailEmployee(id);
    this.modalRef = this.modalService.show(template);
    // console.log(this.id)
  }
  openDelete(deleteTemplate: TemplateRef<any>, id: string, name: string) {
    this.id = id;
    this.Name = name;
    this.modalRef = this.modalService.show(deleteTemplate, { class: 'modal-dialog-centered' });
  }

  closeModal() {
    this.modalRef.hide();
  }


  public message: string;
  preview(files) {
    

    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Chỉ thêm được những tệp file có đuôi .png hoặc .jpg";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.Avatar = reader.result;
    }
  }

  resetForm() {
    this.id = "";
    this.Avatar = "";
    this.Name = "";
    this.Phone = "";
    this.Email = "";
    this.Address = "";
  }



}
