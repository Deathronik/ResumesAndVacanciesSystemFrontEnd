import React, {useState} from 'react';
import './Auth.scss'
import {Link} from "react-router-dom";
import axios from "axios";

const Auth = () => {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    async function onUserAuth() {
        if (userEmail !== "" && userPassword !== "") {
            let response = await axios.get(`https://localhost:44335/api/Account?email=${userEmail}&password=${userPassword}`)
            if (response.status !== 200 || response.data === null) {
                alert(`Помилка, перевірьте правильність вводу даних!`)
            } else {
                let user = response.data;
                localStorage.setItem("user", JSON.stringify(user))
                window.location.href="/";
            }
        } else {
            alert("Всі поля повинні бути заповнені")
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Форма Авторизації</h2>
                    <div className="text-center mb-5 text-dark">Система резюме та вакансій</div>
                    <div className="card my-5">

                        <div className="card-body cardbody-color p-lg-5">

                            <div className="text-center">
                                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                                     className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                     width="200px" alt="profile"/>
                            </div>

                            <div className="mb-3">
                                <input value={userEmail} onChange={event => setUserEmail(event.target.value)} type="text" className="form-control" id="email" aria-describedby="emailHelp"
                                       placeholder="Пошта"/>
                            </div>
                            <div className="mb-3">
                                <input value={userPassword} onChange={event => setUserPassword(event.target.value)} type="password" className="form-control" id="password" placeholder="Пароль"/>
                            </div>
                            <div className="text-center">
                                <button onClick={onUserAuth} type="submit" className="btn btn-color px-5 mb-5 w-100">Авторизуватися</button>
                            </div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">Не маєте акаунту? <Link to="/register" className="text-dark fw-bold"> Створити акаунт</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;