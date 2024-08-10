import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "../../../img/profileImg.png"

export const TarjetaFamiliar = () => {

    return (

        <div class="card" style={{ width: '18rem' }}>
            <h5 class="card-title alias">alias: mi padre</h5>
            <img src={profileImg} class="card-img-top" alt="..." />
            <div class="card-body">
                <div className="row">
                    <div className="col"><a href="#" class="btn btn-primary"> <span className="bi bi-eye"></span>

                    </a>
                    </div>
                    <div className="col"><a href="#" class="btn btn-primary"><span class="glyphicon">&#xe104;</span></a>
                    </div>
                    <div className="col"><a href="#" class="btn btn-primary"><span class="glyphicon">&#xe107;</span>
                    </a></div>
                </div>

            </div>
        </div>
    )
}