const express = require('express')
const cors = require('cors')
const emprouter = require('./router/emprouter')
const userRouter = require('./router/userRouter')
const salaryRouter = require('./router/salaryRouter')
const attRouter = require('./router/attrouter')
const processrouter = require('./router/process')
const app = express();
const PDFDocument = require('pdfkit');
const pdfMakePrinter = require('pdfmake/src/printer');
// const vfsFonts = require('@pdfmake/vfs-fonts');
// vfsFonts.pdfMake.vfs = require('@pdfkit/js/virtual-fs').vfs;

const fs = require('fs');

const SalaryProcess = require('./dao/processDao');


SalaryProcess.getData();


app.use(cors({methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
app.use(express.json())
 
app.use("/emp",emprouter)
app.use("/user",userRouter)
app.use("/sal",salaryRouter)
app.use("/att",attRouter)
app.use("/process",processrouter)

app.get('/process',(req,res) => {
    const {month,user_id,emp_id} = req.query;
    
    console.log("month0>>>",month,user_id,emp_id)

    SalaryProcess.getData(month,user_id,emp_id)
    
    .then(() => {
        console.log("month1>>>",month,user_id,emp_id)
        res.sendStatus(200);
    })
    .catch(error => {
        console.error('An error occurred while processing salary:', error);
        res.sendStatus(500); // Send an error response
      });
})

app.post('/generate-pdf', (req, res) => {
   
    const salaryData = req.body;
   console.log(salaryData)  ;
   const doc =  new PDFDocument();



   
  const stream = doc.pipe(fs.createWriteStream('salary_details.pdf'));

     const cellpadding = 50;
     const headerHeight = 40;
     const rowHeight = 30;

     const tableWidth = 500;
     const contentWidth = tableWidth - cellpadding*2;
     const tablestarty = 200;
     doc.fontSize(16).text('ABC Tech Solutions',{align:'center'})
     doc.moveDown();
     doc.fontSize(14).text('Salary Details',{align:'center'})
   

     doc.fillColor('black').font('Helvetica-Bold').fontSize(12).fill('black');
     doc.rect(cellpadding,tablestarty,tableWidth,headerHeight, cellpadding).fill('#ccc')
     doc.fillColor('black').text('Month', cellpadding+5, tablestarty+5 )
     doc.text('Present',cellpadding+125, tablestarty+5 )
     doc.text('Absent',cellpadding+245, tablestarty+5 )
     doc.text('Salary-Received',cellpadding+365, tablestarty+5 )
   
     doc.font('Helvetica').fontSize(12);
     salaryData.forEach((salary,index) => {
      const rowy = tablestarty + headerHeight + index*rowHeight;
      doc.rect(cellpadding, rowy, tableWidth, rowHeight, cellpadding) .fill(index % 2 === 0 ? 'aliceblue' : 'white').stroke();

      doc.fillColor('black').text(salary.month,cellpadding + 5, rowy + 5);
      doc.text(salary.present,cellpadding + 125, rowy + 5);
      doc.text(salary.absent,cellpadding +245, rowy + 5);
      doc.text(salary.salary,cellpadding + 365, rowy + 5);
  

     });
   

  
    doc.end();
    stream.on('finish', () => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="salary_details.pdf"');
  
      fs.createReadStream('salary_details.pdf').pipe(res);
    });
   
  });



app.get("/",(req,res)=>{
    res.send("api")
});
app.listen(4200,() => {
    console.log("port started in 4200");
})