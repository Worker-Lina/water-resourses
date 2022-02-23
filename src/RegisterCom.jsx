import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { useForm } from "react-hook-form";
import TinyEditor from './components/createObjectsComponents/TinyEditor';
import { useState } from 'react/cjs/react.development';
import { createObject, fetchObjectsStatus, fetchObjectsTypes, fetchOneObjectByAdmin, updateObject, uploadImage } from './http/reservoirApp';
import MySelect from './components/createObjectsComponents/MySelect';
import MapComponent from './components/mapComponent/MapComponent';
import ImgCart from './components/createObjectsComponents/ImgCart';
import ImgUpload from './components/createObjectsComponents/ImgUpload';
import MyButton from './components/myButton/MyButton';
import { Link } from 'react-router-dom';
import { OBJECTS_ROUTE } from './utils/consts';
import Loading from './components/loading/Loading';
import ResponseRequets from './components/responseRequest/ResponseRequets';

const RegisterCom = () => {
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
    const [objectsStatuses, setObjectsStatuses] = useState(null) 
    const [project_draft_ru, setProject_draft_ru] = useState(null)
    const [project_draft_kk, setProject_draft_kk] = useState(null)
    const [project_draft_en, setProject_draft_en] = useState(null)
    const [typeSelectActive, setTypeSelectActive] = useState(false)
    const [statusSelectActive, setStatusSelectActive] = useState(false)
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    useEffect(()=>{
        fetchObjectsTypes().then(data => setObjectsTypes(data.content[0]));
        fetchObjectsStatus().then(data => setObjectsStatuses(data.content[0]));
    }, [])

    useEffect(()=>{
        
            fetchOneObjectByAdmin(166).then(data=>{
                setValue("name_ru", data.content.name_ru);
                data.content.name_kk && setValue("name_kk", data.content.name_kk);
                data.content.name_en && setValue("name_en", data.content.name_en);
                setType(data.content.type);
                if ((data.content.type.id === 2 || data.content.type.id === 3) && data.content.isMagistral === 1){
                    console.log(data.content.isMagistral)
                    setValue("IsMagistral", true)
                }
                setStatus(data.content.status)
                data.content.volume && setValue("volume", data.content.volume)
                data.content.photos && setImages(data.content.photos)

                data.content.goal_ru && setValue("goal_ru", data.content.goal_ru);
                data.content.goal_kk && setValue("goal_kk", data.content.goal_kk);
                data.content.goal_en && setValue("goal_en", data.content.goal_en);

                data.content.expectation_ru && setValue("expectation_ru", data.content.expectation_ru);
                data.content.expectation_kk && setValue("expectation_kk", data.content.expectation_kk);
                data.content.expectation_en && setValue("expectation_en", data.content.expectation_en);

                data.content.water_spring_ru && setValue("water_spring_ru", data.content.water_spring_ru);
                data.content.water_spring_kk && setValue("water_spring_kk", data.content.water_spring_kk);
                data.content.water_spring_en && setValue("water_spring_en", data.content.water_spring_en);

                data.content.water_disposal_ru && setValue("water_disposal_ru", data.content.water_disposal_ru);
                data.content.water_disposal_kk && setValue("water_disposal_kk", data.content.water_disposal_kk);
                data.content.water_disposal_en && setValue("water_disposal_en", data.content.water_disposal_en);

                data.content.technical_solution_ru && setValue("technical_solution_ru", data.content.technical_solution_ru);
                data.content.technical_solution_kk && setValue("technical_solution_kk", data.content.technical_solution_kk);
                data.content.technical_solution_en && setValue("technical_solution_en", data.content.technical_solution_en);

                data.content.responsible_person_ru && setValue("responsible_person_ru", data.content.responsible_person_ru);
                data.content.responsible_person_kk && setValue("responsible_person_kk", data.content.responsible_person_kk);
                data.content.responsible_person_en && setValue("responsible_person_en", data.content.responsible_person_en);

                data.content.total_funding && setValue("total_funding", data.content.total_funding);

                data.content.planner_ru && setValue("planner_ru", data.content.planner_ru);
                data.content.planner_kk && setValue("planner_kk", data.content.planner_kk);
                data.content.planner_en && setValue("planner_en", data.content.planner_en);

                data.content.description_ru && setValue("description_ru", data.content.description_ru)
                data.content.description_kk && setValue("description_kk", data.content.description_kk)
                data.content.description_en && setValue("description_en", data.content.description_en)

                if (data.content.video){
                    data.content.video[0] && setValue("videoUrl1", data.content.video[0])
                    data.content.video[1] && setValue("videoUrl2", data.content.video[1])
                    data.content.video[2] && setValue("videoUrl3", data.content.video[2])
                    data.content.video[3] && setValue("videoUrl4", data.content.video[3])
                    data.content.video[4] && setValue("videoUrl5", data.content.video[4])
                }
                data.content.project_draft_ru && setProject_draft_ru(data.content.project_draft_ru[0])
                data.content.project_draft_kk && setProject_draft_kk(data.content.project_draft_kk[0])
                data.content.project_draft_en && setProject_draft_en(data.content.project_draft_en[0])
            })
        
    }, [id])
        
        const onSubmit = async (data) => {
            const formData = new FormData();
            for(let key in data){
                data[key] && formData.append(key, data[key]);
            }
            formData.append('type', type.id);
            formData.append('status', status.id);
            if(location){
                formData.append(`location[lat]`, location["lat"]);
                formData.append(`location[lng]`, location["lng"]);
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
        let files = [...e.dataTransfer.files]
        files = files.filter(file => (file.type === "image/jpeg" || file.type === "image/png") && file.size < 5242880)
        files.splice(5-images.length)
        setFilesSend([...filesSend, files[0]])
        for(let i=0;i<files.length;i++){
            var reader = new FileReader();
            reader.onload = function (e) {
                let img = {url:e.target.result, type:files[i].type, name: files[i].name}
                setImages(prevImages => [...prevImages, img])
            }        
            reader.readAsDataURL(files[i]);
        }
    }

    async function onAddImage(e){
        if (images.length >=5) { return }
        let files = [...e.target.files]
        files = files.filter(file => (file.type === "image/jpeg" || file.type === "image/png") && file.size < 5242880)
        files.splice(5-images.length)
        setFilesSend([...filesSend, files[0]])
        for(let i=0;i<files.length;i++){
            var reader = new FileReader();
            reader.onload = function (e) {
                let img = {url:e.target.result, type:files[i].type, name: files[i].name}
                setImages(prevImages => [...prevImages, img])
            }        
            reader.readAsDataURL(files[i]);
        }
    }
    
    return (
        <div className="create__object__page">
            {preLoader ? <Loading/> : <></>}
            {active ? <ResponseRequets success={success} setActive={setActive} /> : <></>}
            <div className="page__item">
                <Link to={OBJECTS_ROUTE}><MyButton variant="blue"><span className="button__left"> </span>Назад</MyButton></Link>
                <div className="page__subtitle">{id ? "Редактирование" : "Создание"} объекта</div>
            </div>
            <div className="page__form">
                <form onSubmit={handleSubmit(onSubmit)} className="login-form__content">
                    <div className="label">Название (на русском) *</div>
                    <input className={errors?.Name_ru ? "input input-error" : "input"} type="text" {...register("name_ru", {required: true})}/>
                    {errors?.Name_ru && <div className="label error-label">Поле "Название" обязательно для заполнения</div>}

                    <div className="label">Название (на казахском) *</div>
                    <input className="input" type="text" {...register("name_kk")}/>

                    <div className="label">Название (на английском) *</div>
                    <input className="input"  type="text" {...register("name_en")}/>

                    <div className="object__page-selections">
                        <div className="page__select-parent">
                            <div className="label">Тип объекта *</div>
                            <div className="object__page-select" onClick={e=>selectClick(e, setTypeSelectActive, typeSelectActive)}>
                                <p className="select__value">{type.name}</p>
                                {type ? <span className="select-cross" onClick={()=>{setType('')}}>&#10006;</span>: ""}
                                <span className="select-line"></span>
                                <div className={typeSelectActive ? "select-icon select-icon-active": "select-icon"}></div>
                            </div>
                            {objectsTypes ? <MySelect active={typeSelectActive} setActive={setTypeSelectActive} options={objectsTypes} 
                            setSelectedItem={setType}></MySelect> : <></>}
                        </div>

                        <div className="page__select-parent">
                            <div className="label">Статус объекта *</div>
                            <div className="object__page-select" onClick={e=>selectClick(e, setStatusSelectActive, statusSelectActive)}>
                                <p className="select__value">{status.name}</p>
                                {type ? <span className="select-cross" onClick={()=>{setStatus('')}}>&#10006;</span>: ""}
                                <span className="select-line"></span>
                                <div className={statusSelectActive ? "select-icon select-icon-active": "select-icon"}></div>
                            </div>
                            {objectsStatuses ? <MySelect active={statusSelectActive} setActive={setStatusSelectActive} options={objectsStatuses} 
                            setSelectedItem={setStatus}></MySelect> : <></>}
                        </div>
                    </div>

                    {type.id === 3 || type.id === 4 ? <> <input type="checkbox" {...register("isMagistral")} className="custom-checkbox" id="happy"/>
                    <label htmlFor="happy">Магистральный</label></> :<></>}

                    <div className="label">Местоположение *</div>
                    <MapComponent location={location} setLocation={setLocation} fullScreenButton={false}/>
            
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
                        <input className="input" type="text" {...register("videoUrl1")}></input>
                        <input className="input" type="text" {...register("videoUrl2")}></input>
                        <input className="input" type="text" {...register("videoUrl3")}></input>
                        <input className="input" type="text" {...register("videoUrl4")}></input>
                        <input className="input" type="text" {...register("videoUrl5")}></input>
                    </div>
                    <div className="tiny__container">
                        <TinyEditor setValue={setValue} item="goal_ru" text="Задача объекта (на русском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="goal_kk" text="Задача объекта (на казахском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="goal_en" text="Задача объекта (на английском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="expectation_ru" text="Ожидаемый результат (на русском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="expectation_kk" text="Ожидаемый результат (на казахском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="expectation_en" text="Ожидаемый результат (на английском)"register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="water_spring_ru" text="Источник воды (на русском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="water_spring_kk" text="Источник воды (на казахском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="water_spring_en" text="Источник воды (на английском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="water_disposal_ru" text="Водоотведение (на русском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="water_disposal_kk" text="Водоотведение (на казахском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="water_disposal_en" text="Водоотведение (на английском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="technical_solution_ru" text="Техническое решение (на русском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="technical_solution_kk" text="Техническое решение (на казахском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="technical_solution_en" text="Техническое решение (на английском)" register={register} getValues={getValues}/>
                    </div>
                    <p className="tiny-container-title">Заказчик</p>
                    <div className="tiny__container">
                        <TinyEditor setValue={setValue} item="responsible_person_ru" text="Ответственное лицо (на русском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="responsible_person_kk" text="Ответственное лицо (на казахском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="responsible_person_en" text="Ответственное лицо (на английском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="total_funding" text="Объем финансирования" register={register} getValues={getValues} className="tiny-full-screen"/>
                        <TinyEditor setValue={setValue} item="planner_ru" text="Проектировщик (на русском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="planner_kk" text="Проектировщик (на казахском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="planner_en" text="Проектировщик (на английском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="developer_ru" text="Застройщик (на русском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="developer_kk" text="Застройщик (на казахском)" register={register} getValues={getValues}/>
                        <TinyEditor setValue={setValue} item="developer_en" text="Застройщик (на английском)" register={register} getValues={getValues}/>
                    </div>
                    <div className="draft__photo">
                        <ImgUpload text="Эскизный проект (на русском) (макс. 1)" image={project_draft_ru} setImage={setProject_draft_ru}/>
                        <ImgUpload text="Эскизный проект (на казахском) (макс. 1)" image={project_draft_kk} setImage={setProject_draft_kk}/>
                        <ImgUpload text="Эскизный проект (на английском) (макс. 1)" image={project_draft_en} setImage={setProject_draft_en}/>
                    </div>
                    <div className="line"></div>
                    <div className="page__buttons">
                        <Link to={OBJECTS_ROUTE}><MyButton variant="border red" type="button">Отмена</MyButton></Link>
                        <MyButton variant="green" type="button">Сохранить</MyButton>
                        <input className="btn btn-blue" type="submit" />
                    </div>
                </form>      
            </div>
        </div>
    );
}

export default RegisterCom 