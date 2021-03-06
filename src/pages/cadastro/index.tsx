import React, { useEffect, useState } from "react";

import axios from "axios";

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DoneIcon from '@mui/icons-material/Done';






const Cadastro = (): JSX.Element => {

    const [servico, setServico] = useState({} as any);
    const [showPesquisa, setShowPesquisa] = useState(false);
    const [searchServicos, setSearchServicos] = useState("")
    const [pesquisaComponent, setPesquisaComponent] = useState([])

    useEffect(() => {
        axios.get("https://apisaurussegmentos.azurewebsites.net/api/segmentos?page=1&Descricao=Servi%C3%A7os%20de%20Beleza&TemFiltro=true").then(res => {
            let getServico = res.data.list

            setServico(getServico.find((x: any) => x.descricao == 'Serviços de Beleza'))
        }
        );

    }, [])

    const searchServices = () => {
        axios.get(`https://apisaurussegmentos.azurewebsites.net/api/segmentos?Descricao=${searchServicos}&TemFiltro=true`).then(res => {
            let getDescricao = res.data.list
            setPesquisaComponent(getDescricao)
        })
    }

    return (
        <React.Fragment>
            <Grid container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    textAlign: "center"
                }}
                justifyContent="center"
            >
                <Grid sx={{ minWidth: 275, maxWidth: 600, mt: 10}}>
                    <Grid>
                        <Typography className="title" variant="h3" color="#38B0DE" sx={{ fontWeight: 300 }} gutterBottom>
                            <BusinessCenterOutlinedIcon /> Seguimento da Empresa
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography color="text.secondary">
                                Confirme o seguimento que a
                                sua empresa atua para personalizarmos
                                sua experiência em nosso aplicativo.                    
                        </Typography>
                    </Grid>
                </Grid>

                {
                    !showPesquisa && 
                    <Grid sx={{ maxWidth: 600, mt: 10 }}>

                        <Grid>
                            <Typography  color="text.secondary">
                                Serviço Selecionado:
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography className="subtitle" variant="h3" color="#38B0DE" sx={{ fontWeight: 300 }} gutterBottom>
                                {servico?.descricao}

                                <Button
                                    color="primary"
                                    onClick={() => { setShowPesquisa(true) }}
                                >
                                    <ModeEditOutlineOutlinedIcon className="editBtn"/>
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                }
                {
                    showPesquisa && 
                    <>
                        <Grid sx={{ my: 3 }}>
                            <TextField
                                placeholder="Ex: Restaurante..."
                                value={searchServicos}
                                onChange={(e) => { setSearchServicos(e.target.value) }}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => {
                                                searchServices();
                                            }}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    )
                                }
                                }
                            />
                        </Grid>

                        {
                            pesquisaComponent.map((x: any, i: any) => {
                                return (
                                    <React.Fragment key = {i}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            mt: 1,
                                        }}
                                        >
                                            <Button
                                                className="resultBtn"
                                                variant="contained"
                                                onClick={() => {
                                                    setServico(x);
                                                    setShowPesquisa(false);
                                                }
                                                }
                                            >{x.descricao}
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                            )
                        }
                    </>
                }
                <Grid sx={{
                    gap: 2,
                    display: "flex",
                    my: 4,
                    mx: 3
                }}
                    justifyContent="center"
                >
                    <div className="btnContainer">
                        <Button className="btn1" variant="outlined" color="primary" startIcon={<ArrowBackIosIcon />}>Voltar</Button>
                        <Button className="btn2" variant="contained" color="primary" startIcon={<DoneIcon />}>Finalizar Cadastro</Button>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}

export default Cadastro