import VacationInSearch from "../../VacationSearch/VacationInSearch/VacationInSearch";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const ResumeView = () => {
    const {resumeId} = useParams()
    const [resumeInfo, setResumeInfo] = useState({});
    const [currentUser, setCurrentUser] = useState({})
    const [jobTitle, setJobTitle] = useState("")
    const [salary, setSalary] = useState("")
    const [experience, setExperience] = useState("")
    const [higherEducation, setHigherEducation] = useState("")
    const [description, setDescription] = useState("")

    async function getResumeInfo() {
        let response = await axios.get(`https://localhost:44335/api/Resume/${resumeId}`)
        setResumeInfo(response.data)
        setJobTitle(response.data.JobTitle)
        setSalary(response.data.Salary)
        setExperience(response.data.Experience)
        setHigherEducation(response.data.IsHigherEducation === true ? "2" : "1")
        setDescription(response.data.Description)
        console.log(response.data)
    }

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")))
        getResumeInfo()
    }, [])

    async function onOfferResume() {
        if (resumeInfo.HirerId.includes(currentUser.Id) === false) {
            let response = await axios.post(`https://localhost:44335/api/Resume?resumeID=${resumeId}&hirerID=${currentUser.Id}`)
            if (response.status === 204) {
                alert("Успішно відкликнулися")
                window.location.reload();
            } else
                alert(`Помилка: ${response.status}`)
        } else {
            alert(`Ви вже відкликалися на це резюме`)
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Форма перегляду резюме</h2>
                    <div className="text-center mb-5 text-dark">Система резюме та вакансій</div>
                    <div className="card  my-5">
                        <div className="card-body cardbody-color  p-lg-4">
                            {currentUser.AccountType === 1 &&
                                <div>
                                    <div className="mb-3 text-center">
                                        <h4 className="fw-bold">{resumeInfo.JobTitle}</h4>
                                    </div>
                                    <div className="border p-3 bg-white">
                                        <div className="mb-1  text-center">
                                            <p className="">{resumeInfo.Description}</p>
                                        </div>
                                        <div className="mb-1  text-center">
                                            <p className="">{resumeInfo.CharacterInfo}</p>
                                        </div>
                                        <div className="mb-1  text-center">
                                            <span>| Досвід: {resumeInfo.Experience} | {resumeInfo.OfferedSalary}$ |</span>
                                        </div>
                                        <div className="mb-1  text-center">
                                            <span>| {resumeInfo.UserNames} | {resumeInfo.DateOfBirth} |</span>
                                        </div>
                                        <div className="mb-1 text-center">
                                            <span>| {resumeInfo.PhoneNumber} | {resumeInfo.Email} |</span>
                                        </div>
                                        <div className="mb-1 text-center">
                                            <span>| {resumeInfo.IsHigherEducation === true ? "Є вища освіта" : "Немає вищої оствіти"} |</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={onOfferResume} type="submit"
                                                className="btn btn-color mt-2 px-5 w-100">Відкликнутися на резюме
                                        </button>
                                    </div>
                                </div>
                            }
                            <Link to="/resume-search">
                                <div className="text-center">
                                    <button type="submit"
                                            className="btn btn-exit-color mt-2 px-5 w-100">Повернутися до списку резюме
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

export default ResumeView