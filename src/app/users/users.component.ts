import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { CommonService } from '../common.service';
import Swal from 'sweetalert2';
import { throwIfEmpty } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: any;
  users: any;
  constructor(public fb: FormBuilder, private service: CommonService,) {
    this.userForm = this.fb.group({
      Name: [""],
      Mobile: [""],
      Email: [""],
      Age: [" "]

    })
  }

  ngOnInit() {
    this.GetAllUsers();


  }

  SubmitForm() {

    if (this.userForm.value.Name) {

      var type = this.userForm.value.id == null ? 'Add' : 'Update';
      this.service.addUpdateUser(this.userForm.value, type).subscribe(data => {
        if (type == 'Add') {
          Swal.fire({

            icon: 'success',
            title: 'User (' + this.userForm.value.Name + ' ) Saved Successfully',

          })
        } else {
          Swal.fire({

            icon: 'success',
            title: 'User (' + this.userForm.value.Name + ' ) Updated Successfully',

          })
        }

        this.userForm.reset();
        this.GetAllUsers();
        console.log(data);

      })

    } else {
      Swal.fire({

        icon: 'error',
        title: 'Please Enter User Information',

      })

    }

  };

  GetAllUsers() {


    this.service.GetAllUsers().subscribe(data => {
      this.users = data;
    })
  };

  DeleteConfirmation(ID: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to Delete this user?',

      showCancelButton: true,
      confirmButtonText: 'Yes',

    }).then((result) => {

      if (result.isConfirmed) {
        this.DeleteUserByID(ID)

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  DeleteUserByID(ID: any) {
    this.service.DeleteUserbyID(ID).subscribe(data => {
      Swal.fire('Deleted!', '', 'success')
      this.GetAllUsers();
    })
  };

  GetUserByID(ID: any) {

    this.service.GetUserbyID(ID).subscribe(data => {

      alert("get user successfully")
      console.log("user details", data);
      setTimeout(() => {
        $("#home-tab").click();

      }, 100);
      this.userForm.patchValue({
        Name: data.Name,
        Email: data.Email,
        Mobile: data.Mobile,
        Age: data.Age
      })

    })
  };

}
