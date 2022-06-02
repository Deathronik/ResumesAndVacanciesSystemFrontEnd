import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const YourResume = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [vacationId, setVacationId] = useState({})
    const [userInfo, setUserInfo] = useState(null)
    const [jobTitle, setJobTitle] = useState("")
    const [salary, setSalary] = useState("")
    const [experience, setExperience] = useState("")
    const [higherEducation, setHigherEducation] = useState("")
    const [description, setDescription] = useState("")
    const [characterInfo, setCharacterInfo] = useState("")

    async function getUserInfo() {
        let user = JSON.parse(localStorage.getItem("user"))
        let response = await axios.get(`https://localhost:44335/api/Worker/${user.Id}`)
        setUserInfo(response.data)

        if(response.data.Resumes.length === 0) {
            alert("Спочатку створіть своє резюме, нажміть ок, щоб повернутися в профіль!")
            window.location.href = "/profile"
        }

        setVacationId(response.data.Resumes[0].Id)
        setJobTitle(response.data.Resumes[0].JobTitle)
        setSalary(response.data.Resumes[0].OfferedSalary)
        setExperience(response.data.Resumes[0].Experience)
        setHigherEducation(response.data.Resumes[0].IsHigherEducation === true ? "2" : "1")
        setDescription(response.data.Resumes[0].Description)
        setCharacterInfo(response.data.Resumes[0].CharacterInfo)
    }

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")))
        getUserInfo()
    }, [])

    async function onResumeChange() {
        if (jobTitle !== "" && salary !== "" && experience !== "" && higherEducation !== "" && description !== "" && characterInfo !== "") {
            let newObj = {
                Id: userInfo.Resumes[0].Id,
                UserNames: userInfo.Names,
                JobTitle: jobTitle,
                OfferedSalary: salary,
                DateOfBirth: userInfo.DateOfBirth,
                Experience: experience,
                IsHigherEducation: higherEducation === "1" ? false : true,
                PhoneNumber: userInfo.PhoneNumber,
                Email: userInfo.Email,
                Description: description,
                CharacterInfo: characterInfo,
                WorkerId: userInfo.Id,
                HirerId: userInfo.Resumes[0].HirerId
            }

            let response = await axios.put(`https://localhost:44335/api/Resume`, newObj)
            if (response.status === 204) {
                alert("Успішно збережено")
                window.location.href="/profile";
            }
            else
                alert(`Помилка: ${response.status}`)
        } else {
            alert("Всі поля повинні бути заповнені")
        }
    }

    async function onDeleteResume() {
        let response = await axios.delete(`https://localhost:44335/api/Resume/${userInfo.Resumes[0].Id}`)
        if (response.status === 204) {
            alert("Успішно видалено")
            window.location.href="/profile";
        }
        else {
            alert(`Помилка: ${response.status}`)
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Форма
                        перегляду резюме</h2>
                    <div className="text-center mb-5 text-dark">Система резюме та вакансій</div>
                    <div className="card my-5">
                        <div className="card-body cardbody-color p-lg-5">
                            {currentUser.AccountType === 2 &&
                                <div>
                                    <div className="mb-3">
                                        <input value={jobTitle} onChange={event => setJobTitle(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Назва резюме"/>
                                    </div>
                                    <div className="mb-3">
                                        <input value={salary} onChange={event => setSalary(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Бажана заробітна плата"/>
                                    </div>
                                    <div className="mb-3">
                                        <input value={experience} onChange={event => setExperience(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Років досвіду"/>
                                    </div>
                                    <select value={higherEducation} onChange={event => setHigherEducation(event.target.value)} className="form-select mb-3">
                                        <option value="1">Немає вищої освіти</option>
                                        <option value="2">Є вища освіта</option>
                                    </select>
                                    <div className="form-group">
                                        <label>Коротка біографія</label>
                                        <textarea value={description} onChange={event => setDescription(event.target.value)} className="form-control rounded-0" id="description"
                                                  rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Опишіть свої навички</label>
                                        <textarea value={characterInfo} onChange={event => setCharacterInfo(event.target.value)} className="form-control rounded-0" id="description"
                                                  rows="3"></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={onResumeChange}   type="submit" className="btn btn-color px-5 mt-3 w-100">Зберегти зміни
                                        </button>
                                    </div>
                                    <Link to={`${vacationId}/vacation-offered`}>
                                        <button type="submit"
                                                className="btn  btn-color mt-2 px-5 w-100">Переглянути запропоновані вакансії
                                        </button>
                                    </Link>
                                    <div className="text-center">
                                        <button onClick={onDeleteResume} type="submit"
                                                className="btn btn-exit-color mt-2 px-5 w-100">Видалити резюме
                                        </button>
                                    </div>
                                </div>
                            }
                            <Link to="/profile">
                                <div className="text-center">
                                    <button type="submit"
                                            className="btn btn-exit-color mt-2 px-5 w-100">Повернутися в профіль
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourResume;