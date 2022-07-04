let topDiv = document.createElement('div');
topDiv.id = 'topDiv'
document.getElementById('body').appendChild(topDiv);
function fillTable(pageNumber, pageSize){
    let editStatus = false;
    let table = document.createElement('table');
    table.id = 'userTable';
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    let head = document.createElement('tr');
    let heading_1 = document.createElement('th'); heading_1.innerHTML = "#";
    let heading_2 = document.createElement('th'); heading_2.innerHTML = "Name";
    let heading_3 = document.createElement('th'); heading_3.innerHTML = "Title";
    let heading_4 = document.createElement('th'); heading_4.innerHTML = "Race";
    let heading_5 = document.createElement('th'); heading_5.innerHTML = "Profession";
    let heading_6 = document.createElement('th'); heading_6.innerHTML = "Level";
    let heading_7 = document.createElement('th'); heading_7.innerHTML = "Birthday";
    let heading_8 = document.createElement('th'); heading_8.innerHTML = "Banned";
    let heading_9 = document.createElement('th'); heading_9.innerHTML = "Edit";
    let heading_10 = document.createElement('th'); heading_10.innerHTML = "Delete";
    head.appendChild(heading_1);
    head.appendChild(heading_2);
    head.appendChild(heading_3);
    head.appendChild(heading_4);
    head.appendChild(heading_5);
    head.appendChild(heading_6);
    head.appendChild(heading_7);
    head.appendChild(heading_8);
    head.appendChild(heading_9);
    head.appendChild(heading_10);
    thead.appendChild(head);
    document.getElementById('topDiv').insertBefore(table,pages_block);
    let raceList = ['DWARF','ELF', 'GIANT', 'HOBBIT', 'HUMAN','ORC', 'TROLL'];
    let professionList = ['CLERIC','DRUID', 'NAZGUL', 'PALADIN', 'ROGUE','SORCERER', 'WARRIOR'];
    let bannedList = ['true','false'];
    function generateOptionList(elementsArray, selectedElement) {
        let strTmp ='';
        for (let j = 0; j < elementsArray.length; j++) {
            if(selectedElement==elementsArray[j]){
                strTmp = strTmp + '<option value=\"'+elementsArray[j]+'\"selected>'+elementsArray[j]+'</option>\n'
            } else {
                strTmp = strTmp + '<option value=\"' + elementsArray[j] + '\">' + elementsArray[j] + '</option>\n'
            }
        }
        return strTmp;
    }
    $.get("/rest/players", {pageNumber:pageNumber, pageSize:pageSize}, function( data ){
        for (let i = 0; i < data.length; i++) {
            let row = document.createElement('tr');
            let row_data_ID = document.createElement('td');
            row_data_ID.innerHTML = data[i]["id"];
            let row_data_Name = document.createElement('td');
            row_data_Name.innerHTML = data[i]["name"];
            row_data_Name.id = 'name_'+i;
            let row_data_Title = document.createElement('td');
            row_data_Title.innerHTML = data[i]["title"];
            row_data_Title.id = 'title_'+i;
            let row_data_Race = document.createElement('td');
            row_data_Race.innerHTML = data[i]["race"];
            row_data_Race.id = 'race_'+i;
            let row_data_Profession = document.createElement('td');
            row_data_Profession.innerHTML = data[i]["profession"];
            row_data_Profession.id = 'profession_'+i;
            let row_data_Level = document.createElement('td');
            row_data_Level.innerHTML = data[i]["level"];
            let row_data_Birthday = document.createElement('td');
            row_data_Birthday.innerHTML = new Date(data[i]["birthday"]).toLocaleDateString();
            let row_data_Banned = document.createElement('td');
            row_data_Banned.innerHTML = data[i]["banned"];
            row_data_Banned.id = 'banned_'+i;
            let row_data_Edit = document.createElement('td');
            row_data_Edit.style.cursor = 'pointer';
            row_data_Edit.onclick = function (){
                if (!editStatus) {
                    document.getElementById('delete_' + i).className = 'disabledTD';
                    document.getElementById('del_img_' + i).style.display = 'none';
                    document.getElementById('edit_' + i).src = '\\img\\save.png';
                    document.getElementById('name_'+i).innerHTML="<input type='text' id='name_input_text"+i+"' value='"+document.getElementById('name_'+i).innerHTML+"'>";
                    document.getElementById('title_'+i).innerHTML="<input type='text' id='title_input_text"+i+"' value='"+document.getElementById('title_'+i).innerHTML+"'>";
                    document.getElementById('race_'+i).innerHTML="<select name=\"race\" id=\"race_selector_"+i+"\">\n" +generateOptionList(raceList,document.getElementById('race_'+i).innerHTML)+"</select>";
                    document.getElementById('profession_'+i).innerHTML="<select name=\"profession\" id=\"profession_selector_"+i+"\">\n" +generateOptionList(professionList,document.getElementById('profession_'+i).innerHTML)+"</select>";
                    document.getElementById('banned_'+i).innerHTML="<select name=\"baned\" id=\"banned_selector_"+i+"\">\n" +generateOptionList(bannedList,document.getElementById('banned_'+i).innerHTML)+"</select>";
                    editStatus = true;
                } else{
                    document.getElementById('delete_' + i).className = 'td';
                    document.getElementById('del_img_' + i).style.display = 'table-cell';
                    document.getElementById('edit_' + i).src = '\\img\\edit.png';
                    document.getElementById('edit_' + i).style.cursor = 'pointer';
                    let name_new_value = document.getElementById("name_input_text"+i).value;
                    document.getElementById("name_"+i).innerHTML= name_new_value;
                    let title_new_value = document.getElementById("title_input_text"+i).value;
                    document.getElementById("title_"+i).innerHTML= title_new_value;
                    let race_new_value = document.getElementById("race_selector_"+i).value;
                    document.getElementById("race_selector_"+i).replaceWith(race_new_value);
                    let profession_new_value = document.getElementById("profession_selector_"+i).value;
                    document.getElementById("profession_selector_"+i).replaceWith(profession_new_value);
                    let banned_new_value = document.getElementById("banned_selector_"+i).value;
                    document.getElementById("banned_selector_"+i).replaceWith(banned_new_value);
                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        contentType: 'application/json',
                        url: "rest/players/"+data[i]['id'],
                        data: JSON.stringify({name:name_new_value,title:title_new_value,race:race_new_value,profession:profession_new_value, banned:banned_new_value})
                    })
                    editStatus = false;
                }
            }
            let img_Edit = document.createElement('img');
            img_Edit.id='edit_'+i;
            img_Edit.src = '\\img\\edit.png';
            row_data_Edit.appendChild(img_Edit);
            let row_data_Delete = document.createElement('td');
            row_data_Delete.style.cursor = 'pointer';
            row_data_Delete.onclick = function (){
                $.ajax({
                    type: "DELETE",
                    url: "rest/players/"+data[i]['id']
                })
                $.get("rest/players/count", function( count ){
                    user_count = count;
                });
                let table = document.getElementById('userTable');
                table.remove();
                fillTable(0,sb.value);
                removePageButtons();
                drawPageButton(Math.ceil(user_count/sb.value))
            }
            let img_Delete = document.createElement('img');
            img_Delete.src = '\\img\\delete.png';
            img_Delete.id = 'del_img_'+i;
            row_data_Delete.id = 'delete_'+i;
            row_data_Delete.appendChild(img_Delete);
            row.appendChild(row_data_ID);
            row.appendChild(row_data_Name);
            row.appendChild(row_data_Title);
            row.appendChild(row_data_Race);
            row.appendChild(row_data_Profession);
            row.appendChild(row_data_Level);
            row.appendChild(row_data_Birthday);
            row.appendChild(row_data_Banned);
            row.appendChild(row_data_Edit);
            row.appendChild(row_data_Delete);
            tbody.appendChild(row);
        }
    });
}

let pages_block = document.createElement('div');
pages_block.id = 'pagesBlock'
pages_block.className='pageBlock'
pages_block.innerHTML = 'Pages: '
document.getElementById('topDiv').appendChild(pages_block);
let pageButtonIndex;
function drawPageButton(pageCount){
    for (let i = 0; i < pageCount; i++) {
        let page_button = document.createElement('div');
        page_button.className='pageButton';
        page_button.id = 'PageID_'+i;
        page_button.innerHTML = i;
        page_button.style.cursor = 'pointer';
        if (i==0){
            page_button.className = 'selectedPageButton';
        }
        page_button.onclick = function(){
            let table = document.getElementById('userTable');
            table.remove();
            fillTable(i,sb.value)
            for (let j = 0; j < pageCount; j++) {
                let activeButtonPage = document.getElementById('PageID_'+j);
                if (i==j){
                    activeButtonPage.className='selectedPageButton'
                    pageButtonIndex = j;
                } else{
                    activeButtonPage.className='pageButton'
                }
            }
        }
        document.getElementById('topDiv').appendChild(page_button);
    }
}
fillTable(0,3);
const sb = document.querySelector('#count_per_page')
let user_count;
$.get("rest/players/count", function( count ){
    user_count = count;
    drawPageButton(Math.ceil(user_count/sb.value));
});
function removePageButtons() {
    let i =0;
    let div = document.getElementById('PageID_'+i);
    while (div!=null){
        div.remove();
        i++;
        div = document.getElementById('PageID_'+i);
    }
}
$( "#count_per_page" ).change(function() {
    fillTable(0,sb.value);
    let pages = Math.ceil(user_count / sb.value);
    let table = document.getElementById('userTable');
    table.remove();
    removePageButtons();
    drawPageButton(pages);
});
document.getElementById('body').appendChild(document.createElement('br'));
document.getElementById('body').appendChild(document.createElement('br'));
document.getElementById('body').appendChild(document.createElement('br'));
document.getElementById('body').appendChild(document.createElement('hr'));
function submitData(){
    console.log('submit clicked')
    let name_new_value = document.getElementById('name').value;
    let title_new_value = document.getElementById('title').value;
    let race_new_value = document.getElementById('race').value;
    let profession_new_value = document.getElementById('profession').value;
    let level_new_value = document.getElementById('level').value;
    let str_birthday_new_value = document.getElementById('birthday').value;
    let birthday_new_value = (new Date(str_birthday_new_value)).getTime();
    let banned_new_value = document.getElementById('banned').value;
    console.log(str_birthday_new_value)
    console.log(birthday_new_value)
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: "rest/players/",
        data: JSON.stringify({name:name_new_value,title:title_new_value,race:race_new_value,profession:profession_new_value, birthday:birthday_new_value, banned:banned_new_value, level:level_new_value})
    })
    console.log(pageButtonIndex+", "+sb.value);
    $.get("rest/players/count", function( count ){
        user_count = count;
        let table = document.getElementById('userTable');
        table.remove();
        fillTable(pageButtonIndex,sb.value);
        removePageButtons();
        drawPageButton(Math.ceil(user_count/sb.value));
        let firstButtonPage = document.getElementById('PageID_'+0);
        firstButtonPage.className = 'pageButton';
        let activeButtonPage = document.getElementById('PageID_'+pageButtonIndex);
        activeButtonPage.className = 'selectedPageButton';
    });
}