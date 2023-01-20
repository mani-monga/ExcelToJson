function copyJson(){
    const copyText = document.getElementById('json-result');
    if(copyText.value === ""){
        notifyModalShow('Nothing to copy' , 1000);
    }else{
        notifyModalShow('Copied To Clipboard' , 1000);
        navigator.clipboard.writeText(copyText.value);
    }
}

function clearJson(){
    const ele = document.getElementById('json-result')
    if(ele.value === ''){
        notifyModalShow('Nothing to clear!',1000)
    }else{
        ele.value = "";
        notifyModalShow('Cleared Data',1000)
    }
}

function inputBtnClick(){
    document.getElementById('file_upload').click();
}
function notifyModalShow(text ,time){
    const textContainer = document.getElementById('notifyModalText');
    textContainer.textContent = text;
    textContainer.parentElement.classList.add('active');
    setTimeout(() => {
        textContainer.parentElement.classList.remove('active');
        textContainer.textContent = '';
    }, time);
}
function hideModal(){
    const textContainer = document.getElementById('notifyModalText');
    textContainer.parentElement.classList.remove('active');
    textContainer.textContent = '';
}

function upload() {
    const files = document.getElementById('file_upload').files;
    if(files.length==0){
      notifyModalShow("Please choose any file...",1000);
      return;
    }
    const filename = files[0].name;
    const extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX') {
        excelFileToJSON(files[0]);
    }else{
        notifyModalShow("Please select a valid excel file.",1000);
    }
  }
function excelFileToJSON(file){
try {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e) {

        const data = e.target.result;
        const workbook = XLSX.read(data, {
            type : 'binary'
        });
        const result = {};
        workbook.SheetNames.forEach(function(sheetName) {
        const roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
            result[sheetName] = roa;
        }
    });
        const resultEle=document.getElementById("result-wrapper");
        resultEle.querySelector('#json-result').value=JSON.stringify(result, null, 4);
        resultEle.querySelector('#json-result').style.display='block';
        resultEle.classList.add('active');
        notifyModalShow('Result Displayed',500)
        }
    }catch(e){
        console.error(e);
    }
}