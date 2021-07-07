import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { api } from "../../api/backend";

const fakeEvals = [
    {
        author: "user001",
        comment: "Nulla facilisi. Duis pellentesque id nisi et pulvinar. Sed sed orci ligula. Mauris quis ultrices mi, pellentesque dignissim urna. Pellentesque ac ipsum ut magna aliquet convallis ac at dolor. Nulla volutpat mollis diam, nec placerat quam hendrerit id. Aliquam tempor consectetur tellus, in lacinia felis laoreet in. ",
        rate: 5,
    },
    {
        author: "user002",
        comment: "Aenean non dapibus enim. Maecenas vestibulum augue risus, et gravida ante cursus ut. Integer sit amet accumsan enim. Aliquam nec lacinia eros, et bibendum mauris. ",
        rate: 2,
    },
    {
        author: "user003",
        comment: "Maecenas sit amet dictum est, et pellentesque nibh. Curabitur tincidunt dapibus tortor, nec commodo purus eleifend vitae. Duis volutpat at nisl quis euismod. Vivamus sed cursus lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In elementum, ante quis ullamcorper feugiat, metus ante laoreet felis, eget tempus libero felis id risus. In odio lorem, dignissim eu lectus at, hendrerit consequat lacus. Sed et bibendum nisi, quis rhoncus sem. ",
        rate: 4,
    },
]

function ProductPage(props) {
    let { productId } = useParams();

    const [produto, setProduto] = useState(undefined);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(async () => {
        setLoaded(false);
        const resp = await api.get(`/product/${productId}`);
        console.log(resp)
        if (resp.data.ok === true) {
            setProduto(resp.data.product);
            setError(false)
        }else{
            setError(true)
        }
        setLoaded(true);
    }, [])

    const Eval = ({ e }) => {
        return (
            <li className="list-group-item">
                <article>
                    <div className="d-flex w-25">
                        <h5>{e.author}</h5>
                        <i className="bi bi-star-fill ms-auto"></i>
                        <div>{e.rate}</div>
                    </div>
                    <p>{e.comment}</p>
                </article>
            </li>
        )
    }

    const RatingChart = () => {
        return (
            <div className="d-flex">
                {loaded === true && error === true && <Redirect to="/"></Redirect>}
                <div className="">
                    <i className="bi bi-star-fill fs-1 ms-auto"></i>
                    <h1>4.2</h1>
                </div>
                <div className="ms-5">
                    <div className=" d-flex">
                        <div>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                        </div>

                        <span className="ms-4">{"5"}</span>
                    </div>
                    <div className=" d-flex">
                        <div>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                        </div>

                        <span className="ms-4">{"7"}</span>
                    </div>
                    <div className=" d-flex">
                        <div>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                        </div>

                        <span className="ms-4">{"0"}</span>
                    </div>
                    <div className="d-flex">
                        <div>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                        </div>

                        <span className="ms-4">{"1"}</span>
                    </div>
                    <div className=" d-flex">
                        <div>
                            <i className="bi bi-star-fill fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                            <i className="bi bi-star fs-6 ms-auto"></i>
                        </div>

                        <span className="ms-4">{"0"}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            {produto &&
                <div>
                    <h1>{produto.name}</h1>
                    <div className="d-flex">
                        <img width={500} src={produto.image} />
                        <div>
                            <div className="valor-1 fs-1 fw-bold">R$ {produto.price}</div>
                            <p className="mt-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed a leo vitae libero posuere vulputate id eget mauris.
                                Praesent eleifend malesuada ex non consectetur.
                            </p>
                            <RatingChart></RatingChart>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3>Avaliações</h3>

                        <ul className="list-group">
                            {fakeEvals.map((e, i) => {
                                return <Eval e={e}></Eval>
                            })}
                        </ul>

                    </div>
                </div>
            }
        </div>
    );
}

export default ProductPage;