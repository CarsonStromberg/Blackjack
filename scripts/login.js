
document.getElementById('submitButton').addEventListener('click', function(){
    var userName = document.getElementById('usernameInput').value;
    var passWord = document.getElementById('passwordInput').value;
    var requestData = "userName=" + userName + '&password=' + passWord;
    var xmlHttp = new XMLHttpRequest();

    console.log(requestData)

    xmlHttp.open('POST', 'http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php');
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState = 4 && xmlHttp.status == 200){
            var infoDiv = document.getElementById('loginMessageBoard');
            parseTxt = JSON.parse(xmlHttp.responseText);
            if (parseTxt.result == 'invalid'){
                infoDiv.innerHTML = "Username or Password was not correct";
            }
            else{
                localStorageTxt = parseTxt.userName + " " + parseTxt.timestamp;
                window.localStorage.setItem("cs2550timestamp", localStorageTxt);
                window.location.href = "gamegrid.html";
            }
        }
    };
    xmlHttp.send(requestData);
});
