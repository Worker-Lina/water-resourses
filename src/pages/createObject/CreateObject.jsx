import "./createObject.css"
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useForm } from "react-hook-form";
import React, { useEffect, useState} from 'react'
import { OBJECTS_ROUTE } from '../../utils/consts';
import Loading from '../../components/loading/Loading';
import MyButton from '../../components/myButton/MyButton';
import MapComponent from '../../components/mapComponent/MapComponent';
import ImgCart from '../../components/createObjectsComponents/ImgCart';
import MySelect from '../../components/createObjectsComponents/MySelect';
import ImgUpload, { genUUID } from '../../components/createObjectsComponents/ImgUpload';
import TinyEditor from '../../components/createObjectsComponents/TinyEditor';
import ResponseRequets from '../../components/responseRequest/ResponseRequets';
import { createObject, fetchObjectsStatus, fetchObjectsTypes, fetchOneObjectByAdmin, updateObject, uploadImage } from '../../http/reservoirApp';
import Helmet from "react-helmet";

const CreateObject = () => {
    const {id} = useParams()
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [images, setImages] = useState([])
    const [active, setActive]= useState(false)
    const [success, setSuccess]= useState(false)
    const [filesSend, setFilesSend] = useState([])
    const [location, setLocation] = useState(null)
    const [preLoader, setPreLoader] = useState(false)
    const [objectsTypes, setObjectsTypes] = useState(null) 
    const [isCorrectType, setIsCorrectType]= useState(true)
    const [isCorrectStatus, setIsCorrectStatus]= useState(true)
    const [objectsStatuses, setObjectsStatuses] = useState(null) 
    const [project_draft_ru, setProject_draft_ru] = useState(null)
    const [project_draft_kk, setProject_draft_kk] = useState(null)
    const [project_draft_en, setProject_draft_en] = useState(null)
    const [typeSelectActive, setTypeSelectActive] = useState(false)
    const [isCorrectLocation, setIsCorrectLocation]= useState(true)
    const [statusSelectActive, setStatusSelectActive] = useState(false)
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    useEffect(()=>{
        setPreLoader(true);
        fetchObjectsTypes().then(data => setObjectsTypes(data.content[0]));
        fetchObjectsStatus().then(data => {setObjectsStatuses(data.content[0]); setPreLoader(false)});
    }, [])

    useEffect(()=>{
        if(id) {
            setPreLoader(true);
            const values = getValues();
            fetchOneObjectByAdmin(id).then(data=>{
                for(let key in values){
                    if(key === "video"){
                        for( let i=0; i< data.content[key].length;i++){
                            data.content[key][i] && setValue(`video[${i}]`, data.content[key][i]);
                        }
                    }else{
                        data.content[key] && setValue(key, data.content[key]);
                    }
                }
                setType(data.content.type);
                setStatus(data.content.status)
                data.content.photos && setImages(data.content.photos)
                data.content.location && setLocation(data.content.location)
                data.content.project_draft_ru && setProject_draft_ru(data.content.project_draft_ru[0]);
                data.content.project_draft_kk && setProject_draft_kk(data.content.project_draft_kk[0]);
                data.content.project_draft_en && setProject_draft_en(data.content.project_draft_en[0]);
                setPreLoader(false);
            })
        }
    }, [id])
        
    const onSubmit = async (data) => {
        !location ? setIsCorrectLocation(false) : setIsCorrectLocation(true);
        !type ? setIsCorrectType(false) :setIsCorrectType(true)
        !status ? setIsCorrectStatus(false) : setIsCorrectStatus(true)
        if(!location || !type || !status){
            return
        }
        setPreLoader(true);
        const formData = new FormData();
        for(let key in data){
                if(key === "video"){
                    for(let i=0;i<data[key].length;i++){
                        formData.append(`video[${i}]`, data[key][i]);
                    }
                }else{
                    data[key] && formData.append(key, data[key]);
                }
        }
        formData.append('type', type.id);
        formData.append('status', status.id);
        if(location){
            formData.append(`location[lat]`, location.lat);
            formData.append(`location[lng]`, location.lng);
        }
        if(images){
            let j=0;
            for(let i=0; i<images.length;i++){
                if(images[i].id){
                    let imgFormData = new FormData();
                    imgFormData.append('file', filesSend[j]);
                    let data = await uploadImage(imgFormData);
                    formData.append(`photos[${i}][url]`, data.content.value);
                    j=j+1;
                }else{
                    formData.append(`photos[${i}][url]`, images[i].url);
                }
                formData.append(`photos[${i}][type]`,images[i].type);
                formData.append(`photos[${i}][name]`, images[i].name);
            }
        }
            
        if(project_draft_ru){
            if(project_draft_ru.url){
                formData.append(`project_draft_ru[0][url]`, project_draft_ru.url)
            }else{
                let projectRuFormData = new FormData()
                projectRuFormData.append('file', project_draft_ru)
                let data = await uploadImage(projectRuFormData);
                formData.append(`project_draft_ru[0][url]`, data.content.value)
                console.log(data)
            }
            formData.append(`project_draft_ru[0][type]`, project_draft_ru.type)
            formData.append(`project_draft_ru[0][name]`, project_draft_ru.name)    
        }

        if(project_draft_kk){
            if(project_draft_kk.url){
                formData.append(`project_draft_kk[0][url]`, project_draft_kk.url)
            }else{
                let projectRuFormData = new FormData()
                projectRuFormData.append('file', project_draft_kk)
                let data = await uploadImage(projectRuFormData);
                formData.append(`project_draft_kk[0][url]`, data.content.value)
                console.log(data)
            }
            formData.append(`project_draft_kk[0][type]`, project_draft_kk.type)
            formData.append(`project_draft_kk[0][name]`, project_draft_kk.name)    
        }

        if(project_draft_en){
            if(project_draft_en.url){
                formData.append(`project_draft_en[0][url]`, project_draft_en.url)
            }
            else{
                let projectEnFormData = new FormData()
                projectEnFormData.append('file', project_draft_en)
                let data = await uploadImage(projectEnFormData);
                formData.append(`project_draft_en[0][url]`, data.content.value)
            }
            formData.append(`project_draft_en[0][type]`, project_draft_en.type)
            formData.append(`project_draft_en[0][name]`, project_draft_en.name)
        }

        if(id){
                try{
                    updateObject(id, formData).then(data => {console.log(data); setActive(true); setSuccess(true); setPreLoader(false)});
                }catch(e){
                    setPreLoader(false)
                    console.log(e);
                    setSuccess(false)
                }
            }else{
                try{
                    createObject(formData).then(data=>{console.log("data ", data); setActive(true); setSuccess(true); setPreLoader(false)}); 
                }catch(e){
                    setPreLoader(false)
                    console.log(e);
                    setSuccess(false)
                }
        }  
    }


    const selectClick = (e, setSelectActive, selectActive)=>{
        setSelectActive(!selectActive);e.stopPropagation();
        document.body.addEventListener('click', function(){setSelectActive(false)});
        document.body.removeEventListener('click', function(){setSelectActive(false)})           
    }

    function dragStartHandler(e){ e.preventDefault(); }
    function dragLeaveHandler(e){ e.preventDefault(); }

    async function ondropHandler(e){
        e.preventDefault();
        if (images.length >=5) { return }
        let files = []
        if(e.type === "change"){
            files = [...e.target.files]
        }else if(e.type === "drop"){
            files = [...e.dataTransfer.files]
        }
        files = files.filter(file => (file.type === "image/jpeg" || file.type === "image/png") && file.size < 5242880)
        files.splice(5-images.length)
        setFilesSend([...filesSend, files[0]])
        for(let i=0;i<files.length;i++){
            var reader = new FileReader();
            reader.onload = function (e) {
                let img = {id: genUUID(), url:e.target.result, type:files[i].type, name: files[i].name}
                setImages(prevImages => [...prevImages, img])
            }        
            reader.readAsDataURL(files[i]);
        }
    }

    return (
        <div className="create__object__page">
            <Helmet>
                <title>{id ? "Редактирование" : "Создание"} объекта</title>
            </Helmet>
            {preLoader ? <Loading/> : <></>}
            {active ? <ResponseRequets success={success} setActive={setActive} /> : <></>}
            <div className="page__item">
                <Link to={OBJECTS_ROUTE}><MyButton variant="blue"><span className="button__left"> </span>Назад</MyButton></Link>
                <div className="page__subtitle">{id ? "Редактирование" : "Создание"} объекта</div>
            </div>
            <div className="page__form">
                {preLoader ? <div className="preLoader"/> : <></>}
                <form onSubmit={handleSubmit(onSubmit)} className="login-form__content">
                    <div className="label">Название (на русском) *</div>
                    <input className={errors?.name_ru ? "input input-error" : "input"} type="text" {...register("name_ru", {required: true})}/>
                    {errors?.name_ru && <div className="label error-label">Поле "Название" обязательно для заполнения</div>}

                    <div className="label">Название (на казахском) *</div>
                    <input className="input" type="text" {...register("name_kk")}/>

                    <div className="label">Название (на английском) *</div>
                    <input className="input"  type="text" {...register("name_en")}/>

                    <div className="object__page-selections">
                        <div className="page__select-parent">
                            <div className="label">Тип объекта *</div>
                            <div className={isCorrectType ? "object__page-select" : "object__page-select select-error"} onClick={e=>selectClick(e, setTypeSelectActive, typeSelectActive)}>
                                <p className="select__value">{type.name}</p>
                                {type ? <span className="select-cross" onClick={()=>{setType('')}}>&#10006;</span>: ""}
                                <span className="select-line"></span>
                                <div className={typeSelectActive ? "select-icon select-icon-active": "select-icon"}></div>
                            </div>
                            {objectsTypes ? <MySelect active={typeSelectActive} setActive={setTypeSelectActive} options={objectsTypes} 
                            setSelectedItem={setType}></MySelect> : <></>}
                            {isCorrectType ? <></> : <div className="label error-label">Поле "Тип" обязательно для заполнения</div>}
                        </div>

                        <div className="page__select-parent">
                            <div className="label">Статус объекта *</div>
                            <div className={isCorrectStatus ? "object__page-select" : "object__page-select select-error"}  onClick={e=>selectClick(e, setStatusSelectActive, statusSelectActive)}>
                                <p className="select__value">{status.name}</p>
                                {type ? <span className="select-cross" onClick={()=>{setStatus('')}}>&#10006;</span>: ""}
                                <span className="select-line"></span>
                                <div className={statusSelectActive ? "select-icon select-icon-active": "select-icon"}></div>
                            </div>
                            {objectsStatuses ? <MySelect active={statusSelectActive} setActive={setStatusSelectActive} options={objectsStatuses} 
                            setSelectedItem={setStatus}></MySelect> : <></>}
                            {isCorrectStatus ? <></> : <div className="label error-label">Поле "Статус" обязательно для заполнения</div>}
                        </div>
                    </div>

                    {type.id === 3 || type.id === 4 ? <> <input type="checkbox" {...register("isMagistral")} className="custom-checkbox" id="happy"/>
                    <label htmlFor="happy">Магистральный</label></> :<></>}

                    <div className="label">Местоположение *</div>
                    <MapComponent location={location} setLocation={setLocation} fullScreenButton={false}/>
                    {isCorrectLocation ? <></> : <div className="label error-label">Вы не выбрали Местоположение</div>}
            
                    <div className="label">Объем (м<sup><small>3</small></sup>) *</div>
                    <input className="input" type="text" {...register("volume")}></input>

                    <div className="label">Фотографии *</div>
                    <div className="img__upload"
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                        onDrop={e=>ondropHandler(e)}>
                        <p>
                            .jpg, .png <br/> Не более 5МБ
                        </p>
                        <input className="input__upload" type="file" multiple="multiple" accept=".jpg,.jpeg,.png" onChange={(e)=>ondropHandler(e)}></input>
                    </div>
                    {images.length ? images.map(img =>
                        <ImgCart key={img.url} images={images} setImages={setImages} image={img}/>
                    ): <></>}

                    <div className="label">Ссылки на YouTube (макс. 5)</div>
                    <div className="youtube-div">
                        <input className="input" type="text" {...register("video[0]")}></input>
                        <input className="input" type="text" {...register("video[1]")}></input>
                        <input className="input" type="text" {...register("video[2]")}></input>
                        <input className="input" type="text" {...register("video[3]")}></input>
                        <input className="input" type="text" {...register("video[4]")}></input>
                    </div>
                    <div className="tiny__container">
                        <TinyEditor setValue={setValue} getValues={getValues} item="goal_ru" text="Задача объекта (на русском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="goal_kk" text="Задача объекта (на казахском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="goal_en" text="Задача объекта (на английском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="expectation_ru" text="Ожидаемый результат (на русском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="expectation_kk" text="Ожидаемый результат (на казахском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="expectation_en" text="Ожидаемый результат (на английском)"register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="water_spring_ru" text="Источник воды (на русском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="water_spring_kk" text="Источник воды (на казахском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="water_spring_en" text="Источник воды (на английском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="water_disposal_ru" text="Водоотведение (на русском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="water_disposal_kk" text="Водоотведение (на казахском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="water_disposal_en" text="Водоотведение (на английском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="technical_solution_ru" text="Техническое решение (на русском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="technical_solution_kk" text="Техническое решение (на казахском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="technical_solution_en" text="Техническое решение (на английском)" register={register}/>
                    </div>
                    <p className="tiny-container-title">Заказчик</p>
                    <div className="tiny__container">
                        <TinyEditor setValue={setValue} getValues={getValues} item="responsible_person_ru" text="Ответственное лицо (на русском)" register={register} />
                        <TinyEditor setValue={setValue} getValues={getValues} item="responsible_person_kk" text="Ответственное лицо (на казахском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="responsible_person_en" text="Ответственное лицо (на английском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="total_funding" text="Объем финансирования" register={register} className="tiny-full-screen"/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="planner_ru" text="Проектировщик (на русском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="planner_kk" text="Проектировщик (на казахском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="planner_en" text="Проектировщик (на английском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="developer_ru" text="Застройщик (на русском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="developer_kk" text="Застройщик (на казахском)" register={register}/>
                        <TinyEditor setValue={setValue} getValues={getValues} item="developer_en" text="Застройщик (на английском)" register={register}/>
                    </div>
                    <div className="draft__photo">
                        <ImgUpload text="Эскизный проект (на русском) (макс. 1)" image={project_draft_ru} setImage={setProject_draft_ru}/>
                        <ImgUpload text="Эскизный проект (на казахском) (макс. 1)" image={project_draft_kk} setImage={setProject_draft_kk}/>
                        <ImgUpload text="Эскизный проект (на английском) (макс. 1)" image={project_draft_en} setImage={setProject_draft_en}/>
                    </div>
                    <div className="line"></div>
                    <div className="page__buttons">
                        <Link to={OBJECTS_ROUTE}><MyButton variant="border red" type="button">Отмена</MyButton></Link>
                        <input className="btn btn-green" type="submit" />
                    </div>
                </form>      
            </div>
        </div>
    );
}

export default CreateObject 