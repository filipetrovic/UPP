import { Component, OnInit } from '@angular/core';
import { ProcessService } from 'src/app/services/process-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scientificWorkSubmission',
  templateUrl: './scientificWorkSubmission.component.html',
  styleUrls: ['./scientificWorkSubmission.component.scss']
})
export class ScientificWorkSubmissionComponent implements OnInit {

  constructor(
    private processService: ProcessService,
    private route: ActivatedRoute
  ) { }

  public formFields: any[];
  private taskId;

  ngOnInit() {
    this.taskId = this.route.snapshot.params['taskId'];
    console.log(this.taskId);
    this.processService.getTaskForm(this.taskId).subscribe( (res : any) =>{
      this.formFields = res.formFields;
    })
  }

  submit(value, form) {
    console.log(value);
    let properties = new Array();
    for (var property in value) {
      properties.push({fieldId : property, fieldValue : value[property]});
    }

    this.processService.submitTask(properties,this.taskId)
      .subscribe( (res:any) => {
        alert("Success!");
      })

  }

}
