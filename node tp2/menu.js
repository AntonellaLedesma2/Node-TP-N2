export function menu() {
    return `
        <style>
            *{
                box-sizing: border-box;
            }

            body{
                font-family: Arial, sans-serif;
                margin:0;
                background: linear-gradient(135deg, #eef2f7, #d9e4f5);
                text-align:center;
                min-height:100vh;
            }

            nav{
                background: rgba(44, 62, 80, 0.95);
                padding:20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.25);

                display:flex;
                justify-content:center;
                flex-wrap:wrap;
                gap:15px;

                border-bottom-left-radius:20px;
                border-bottom-right-radius:20px;
            }

            nav a{
                text-decoration:none;
                color:white;
                background: linear-gradient(135deg, #3498db, #5dade2);
                padding:14px 22px;
                border-radius:18px;
                font-weight:bold;
                transition:0.3s;
                min-width:130px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            }

            nav a:hover{
                transform: translateY(-3px) scale(1.03);
                box-shadow: 0 6px 15px rgba(0,0,0,0.25);
            }

            .contenedor{
                width:80%;
                max-width:900px;
                margin:40px auto;
                background:white;
                padding:35px;
                border-radius:20px;
                box-shadow:0 8px 25px rgba(0,0,0,0.12);
            }

            h1{
                color:#2c3e50;
                font-size:2rem;
                margin-bottom:20px;
            }

            p{
                font-size:1.1rem;
                color:#555;
                line-height:1.6;
            }

            /* 📱 Responsive */
            @media (max-width: 768px){
                nav{
                    flex-direction:column;
                    align-items:center;
                    padding:15px;
                }

                nav a{
                    width:90%;
                    max-width:320px;
                }

                .contenedor{
                    width:94%;
                    padding:25px;
                }

                h1{
                    font-size:1.6rem;
                }

                p{
                    font-size:1rem;
                }
            }
        </style>

        <nav>
            <a href="/">Inicio</a>
            <a href="/tiempo">Tiempo</a>
            <a href="/calculo">Calculo</a>
            <a href="/url">URL</a>
            <a href="/uppercase">Upper Case</a>
            <a href="/info">Informacion</a>
        </nav>
    `;
}