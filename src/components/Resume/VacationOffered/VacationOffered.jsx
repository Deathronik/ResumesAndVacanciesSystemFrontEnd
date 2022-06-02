import VacationInSearch from "../../VacationSearch/VacationInSearch/VacationInSearch";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import Resume from "../../ResumeSearch/Resume/Resume";

const VacationOffered = () => {
    const {resumeId} = useParams()
    const [vacations, setVacations] = useState([])
    const [resume, setResume] = useState({})

    async function getVacations() {
        setVacations([])
        let hirerIds = resume.HirerId

        for (const id of hirerIds) {
            let response = await axios.get(`https://localhost:44335/api/Hirer/${id}`)
            let tmp = vacations
            tmp.push(...response.data.Vacations)
            setVacations(tmp)
            console.log(tmp)
        }
    }

    async function getResumes() {
        let response = await axios.get(`https://localhost:44335/api/Resume/${resumeId}`)
        setResume(response.data)
    }

    useEffect(() => {
        getVacations()
    }, [resume])

    useEffect(() => {
        getResumes()
    }, [])

    return(
        <div className="container rounded mt-5 mb-5 mw-100">
            <div className="d-flex justify-content-center row">
                <div className="d-flex justify-content-center col-1 cardbody-color  col-md-5 border-right border">
                    <div className="d-flex flex-column container rounded mt-5 mb-5 justify-content-center align-content-center mw-100">
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <h4 className="text-right">Запропоновані вакансії</h4>
                        </div>
                        <div>
                            {vacations.map((vacation) => <VacationInSearch vacation={vacation} key={vacation.Id}/>)}
                        </div>
                        <Link to="/your-resume">
                            <div className="text-center">
                                <button type="submit"
                                        className="btn btn-exit-color mt-2 px-5 w-100">Повернутися до резюме
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VacationOffered