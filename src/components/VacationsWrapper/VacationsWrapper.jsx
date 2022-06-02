import Vacation from "./Vacation/Vacation";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const VacationsWrapper = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [vacations, setVacations] = useState([])


    async function getUserInfo() {
        let user = JSON.parse(localStorage.getItem("user"))
        let response = await axios.get(`https://localhost:44335/api/Hirer/${user.Id}`)
        console.log(response.data.Vacations)
        setUserInfo(response.data)
        setVacations(response.data.Vacations)
    }

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")))
        getUserInfo()
    }, [])

    return (
        <div className="d-flex container rounded mt-5 mb-5 justify-content-center align-content-center mw-100">
            <div className="cardbody-color col-md-4 border">
                <div className="p-3 py-3 pb-3">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <h4 className="text-right">Ваші вакансії</h4>
                    </div>
                    <div>
                        {vacations.map((vacation) => <Vacation vacation={vacation} key={vacation.Id}/>)}
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
    )
}

export default VacationsWrapper;