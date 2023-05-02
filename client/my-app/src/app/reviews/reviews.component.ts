import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as sanitizeHtml from 'sanitize-html';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{
  items:any;
  myReviews:any;
  postdata:any;
  token:any;
  constructor(private http:HttpClient) { }

  getItemNames(){
    let url = "https://localhost/630/items.php";
    this.http.get(url).subscribe((result:any)=>
    {

      let final = result.map((element: any) => 
        JSON.parse(element));
      this.items = final;
    });
  }

  ngOnInit(): void{
    this.getItemNames();
    this.token = localStorage.getItem('token')
    this.getData();
    $(document).ready(function (){
      var tableName, client, review, itemid;

      $(".serviceReview").hide();
      $(".productReview").hide();
      $(".btn").hide();
      $("#product, #service").click(function (){
        $(".btn").show();
      })

      $("#service").click(function (){
        $(".serviceReview").show();
        $(".productReview").hide();
        $(".btn-primary").click(function () {
          tableName = "reviews";
          client = localStorage.getItem('token');
          review = sanitizeHtml(<string>$("#review").val());

          const size = review.length;
          if (size > 0 && size <= 255){
            const postdata = {
              "tableName" : tableName,
              "client" : client, 
              "review" : review
          };
          fetch("http://localhost/630/reviews.php", 
              {
                  method: "POST",
                  mode: "cors",
                  body: JSON.stringify(postdata)
              });
              $("#review").val("");
              $("#totalCount").html(`Total Character Count is: 0`);
          } else alert("Review should be less than 255 characters, and not empty!");
  
        });
        $("#review").on('change keyup paste', function (){
          var total = <string>$("#review").val();
          $("#totalCount").html(`Total Character Count is: ${total.length}`);
        })
      })
  
      $("#product").click(function (){
        $(".productReview").show();
        $(".serviceReview").hide();
  
        $(".btn-primary").click(function () {
          tableName = "productreviews";
          review = $('input[name="rate"]:checked').val();
          itemid = $('#items').find(":selected").val();
          client = localStorage.getItem('token');
  
          const postdata = {
            "tableName" : tableName,
            "itemid" : itemid,
            "client" : client, 
            "review" : review
          };
          fetch("http://localhost/630/reviews.php", 
              {
                  method: "POST",
                  mode: "cors",
                  body: JSON.stringify(postdata)
              });
        })
      })
    })
  
  }
  getData(){
    fetch("https://localhost/630/get_review.php",
      {
        method: "GET",
        mode: "cors",
      }).then((res) => res.json())
      .then((data) => this.myReviews = data.reverse())
  }
  
}
