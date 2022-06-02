import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";


const VacationOfferedView = () => {
    const {vacationId, resumeId} = useParams()
    const [vacationInfo, setVacationInfo] = useState({});
    const [currentUser, setCurrentUser] = useState({})
    const [jobTitle, setJobTitle] = useState("")
    const [salary, setSalary] = useState("")
    const [experience, setExperience] = useState("")
    const [higherEducation, setHigherEducation] = useState("")
    const [description, setDescription] = useState("")
    const [bonus, setBonus] = useState("")
    const [cityName, setCityName] = useState("")

    async function getVacationInfo() {
        let response = await axios.get(`https://localhost:44335/api/Vacation/${vacationId}`)
        setVacationInfo(response.data)
        setJobTitle(response.data.JobTitle)
        setSalary(response.data.Salary)
        setExperience(response.data.Experience)
        setHigherEducation(response.data.IsHigherEducation === true ? "2" : "1")
        setDescription(response.data.Description)
        setCityName(response.data.CityName)
        setBonus(response.data.IsBonus === true ? "2" : "1")
    }

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")))
        getVacationInfo()
    }, [])

    async function onOfferVacation() {
        if (vacationInfo.WorkerId.includes(currentUser.Id) === false) {
            let response = await axios.post(`https://localhost:44335/api/Vacation?vacationID=${vacationId}&workerID=${currentUser.Id}`)
            if (response.status === 204) {
                alert("Успішно відкликнулися")
                window.location.reload();
            } else
                alert(`Помилка: ${response.status}`)
        } else {
            alert(`Ви вже відкликалися на цю вакансію`)
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Форма перегляду вакансій</h2>
                    <div className="text-center mb-5 text-dark">Система резюме та вакансій</div>
                    <div className="card  my-5">
                        <div className="card-body cardbody-color  p-lg-4">
                            {currentUser.AccountType === 2 &&
                                <div>
                                    <div className="mb-3 text-center">
                                        <h4 className="fw-bold">{vacationInfo.JobTitle}</h4>
                                    </div>
                                    <div className="border p-3 bg-white">
                                        <div className="mb-1  text-center">
                                            <p className="">{vacationInfo.Description}</p>
                                        </div>
                                        <div className="mb-1  text-center">
                                            <span>| Досвід: {vacationInfo.Experience} | {vacationInfo.CityName} | {vacationInfo.Salary}$ | {vacationInfo.IsBonus === true ? 'Бонуси' : "Без бонусів"} |</span>
                                        </div>
                                        <div className="mb-1  text-center">
                                            <span>| {vacationInfo.CompanyName} | {vacationInfo.HirerNames} |</span>
                                        </div>
                                        <div className="mb-1 text-center">
                                            <span>| {vacationInfo.PhoneNumber} | {vacationInfo.Email} |</span>
                                        </div>
                                        <div className="mb-1 text-center">
                                            <span>| {vacationInfo.IsHigherEducation === true ? "Потрібна вища освіта" : "Не потрібна вища оствіта"} |</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={onOfferVacation} type="submit"
                                                className="btn btn-color mt-2 px-5 w-100">Відкликнутися на вакансію
                                        </button>
                                    </div>
                                </div>
                            }
                            <Link to={`/your-resume/${resumeId}/vacation-offered`}>
                                <div className="text-center">
                                    <button type="submit"
                                            className="btn btn-exit-color mt-2 px-5 w-100">Повернутися до списку вакансій
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

export default VacationOfferedView