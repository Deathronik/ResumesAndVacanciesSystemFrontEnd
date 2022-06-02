import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const OfferedResume = () => {
    const {vacationId} = useParams()
    const [resumes, setResumes] = useState([])
    const [vacation, setVacation] = useState({})

    async function getResumes() {
        setResumes([])
        let workerIds = vacation.WorkerId

        for (const id of workerIds) {
            let response = await axios.get(`https://localhost:44335/api/Worker/${id}`)
            let tmp = resumes
            tmp.push(response.data.Resumes[0])
            setResumes(tmp)
            console.log(tmp)
        }
    }

    async function getVacation() {
        let response = await axios.get(`https://localhost:44335/api/Vacation/${vacationId}`)
        setVacation(response.data)
    }


    useEffect(() => {
        getResumes()
    }, [vacation])

    useEffect(() => {
        getVacation()
    }, [])

    return (
        <div className="container rounded mt-5 mb-5 mw-100">
            <div className="d-flex justify-content-center row">
                <div className="d-flex justify-content-center col-1 cardbody-color  col-md-5 border-right border">
                    <div
                        className="d-flex flex-column container rounded mt-5 mb-5 justify-content-center align-content-center mw-100">
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <h4 className="text-right">Запропоновані резюме</h4>
                        </div>
                        <div>

                        </div>
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
    )
}

export default OfferedResume