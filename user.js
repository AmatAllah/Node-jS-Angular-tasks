//Read data from storage
const getCustomers = function(){
    let customers

	if(localStorage.getItem('customers')){
		customers = JSON.parse(localStorage.getItem('customers'))
	}else{
		customers = []
	}
		return customers
}

//set data to storage
const setCustomers = function(data){
    if(!Array.isArray(data)) data=[]
    //Convert json array to string
    stringData = JSON.stringify(data)
    //store data in storage
	localStorage.setItem('customers' , stringData)
	
}
//console.log(getCustomers() )

userInfo = getCustomers() 

    const addUser = document.querySelector("#addUser")
    userMainHeads = [
        {name:"id" , dataStorage:null , default:Date.now() , isDefault:true},  // The same name in the  HTML elements inputs
        {name:"name" , dataStorage:"value" , default:null , isDefault:false},
        {name:"address" , dataStore:"value" , default:null , isDefault:false},

        {name:"phone" , dataStore:"value", default:null , isDefault:false},

        {name:"balance" , dataStore:"value" , default:null , isDefault:false},  // 
      //  {name:"actions" , dataStore:null , default:" " , isDefault:true} , 
      //  {name:"transActionType" , dataStore:"value", default:null , isDefault:false} //Check - transaction
    ]
    if(addUser){
        addUser.addEventListener("submit" , function(e){
            e.preventDefault()
            const user = {}
            userMainHeads.forEach(head=>{
                //let i=5000 ;
                if(head.isDefault ) {user[head.name]= Date.now()} 
                else {user[head.name] = this.elements[head.name][head.dataStore]}  
            });

            
            userInfo.push(user)   //Array with from getCustomers() function
            this.reset()
            setCustomers(userInfo)//setDataToStorage(userInfo)
            console.log(userInfo)

            //After adding , redirect the user to the index.html which show the users
            window.location.replace("index.html") 
        })

    }//end if

 const content = document.querySelector("#customersTable")
 if(content){
     //When there is no users
     if(userInfo.length == 0){
         let tr =  document.createElement('tr')
         tr.classList= "alert alert-danger text-center"
         content.appendChild(tr)

         let td = document.createElement('tr')
         td.textContent = "No Users yet"
         td.setAttribute("colspan" , 6)
         tr.appendChild(td)

     }else{
        userInfo.forEach((user , i)=>{                  //userInfo array
            let tr =  document.createElement('tr')
            content.appendChild(tr)
            userMainHeads.forEach(head=>{
                td= document.createElement('td')
                td.textContent = user[head.name]  
                tr.appendChild(td)

           })
           const btnShow = createNewElement('BUTTON' , td , "Show" , "btn btn-primary mx-3" , "")
           const btnEdit = createNewElement('BUTTON' , td , "Edit" , "btn btn-warning mx-3" , "")
           const btnDel = createNewElement('BUTTON' , td , "Delete" , "btn btn-danger mx-3" , "")
           btnDel.addEventListener('click' , function(e){
           //  alert(  userInfo.splice(userInfo[i].value, 1) );
           alert(  userInfo[i].name )
           //alert(  this.id )

              //  let newData = []
               this.parentElement.parentElement.remove()
               //data = getCustomers()
              // newData = data.filter(user=>{return (this.id) != userInfo[index]} ) ; setCustomers(newDatas)

           })
           btnEdit.addEventListener('click' , function(e){
                localStorage.setItem("user", JSON.stringify(user))
                window.location.replace("edit.html")
           })
           btnShow.addEventListener('click' , function(e){
                localStorage.setItem('editIndex', index)
                window.location.replace("single.html")
           })
            
        })
     }
     userInfo.forEach(user=>{
         console.log(user)
     })
 }

 //Function to create elements : 
function createNewElement(element , parent , textCont="" , classe ="" , /*attributes =[]*/){  //نكتبهم بالترتيب عند الاستخدام
    ele  = document.createElement(element)
    parent.appendChild(ele)
    ele.textContent = textCont
    ele.classList = classe  

    /*attributes.forEach(attr=>{
        ele.setAttribute(attr.name , attr.val)

    }) */
    return ele
}
attrs  = [{attrName:"" , attrVal:""}]
/*attrs= [{
        name: attrs.name , val: attrs.val
    }]*/
