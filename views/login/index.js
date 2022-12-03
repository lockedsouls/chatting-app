if (window.localStorage.getItem("client")) window.location.replace("http://localhost:3000/rooms");

const button = document.querySelector("#button");
button.onclick = () => {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const bg_blur = document.querySelector("#background-blur");

    let input_validity = {
        username: 1,
        password: 1
    };

    username.onfocus = () => {
        username.classList.remove("error");
        input_validity.username = 1;
        if (input_validity.username == 1 && input_validity.username == 1) bg_blur.classList.remove("error");
        
    }
    password.onfocus = () => {
        password.classList.remove("error");
        input_validity.password = 1;
        if (input_validity.password == 1 && input_validity.password == 1) bg_blur.classList.remove("error");
    }


    validate(username, password, bg_blur, input_validity);

    if (input_validity.username && input_validity.password){
        fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username.value, password: password.value})
        }).then(res => {
            if (res.status == 202) {
                window.localStorage.setItem("client", JSON.stringify({"username": username.value}));
                window.location.replace("http://localhost:3000/rooms");
            }
        }).catch(error => console.log(error));
    }
}

function validate(username, password, bg_blur, input_validity){
    if (username.value == "") {
        username.classList.add("error");
        bg_blur.classList.add("error");
        input_validity.username = 0;
    }
    if (password.value == "") {
        password.classList.add("error");
        bg_blur.classList.add("error");
        input_validity.password = 0;
    }
}