import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../../components/myButton/MyButton'
import MySelect from '../../components/createObjectsComponents/MySelect'
import "./createObject.css"
import ImgCart from '../../components/createObjectsComponents/ImgCart'
import TinyComponent from '../../components/createObjectsComponents/TinyComponent'
import { OBJECTS_ROUTE } from '../../utils/consts'
import MapComponent from '../../components/mapComponent/MapComponent'
import ImgUpload from '../../components/createObjectsComponents/ImgUpload'
import { createObject, fetchObjectsStatus, fetchObjectsTypes, fetchOneObjectByAdmin, updateObject, uploadImage } from '../../http/reservoirApp'
import { useParams } from 'react-router';
import ResponseRequets from '../../components/responseRequest/ResponseRequets'

const CreateObject = () => {
    const {id} = useParams()
    const [active, setActive]= useState(false)
    const [success, setSuccess]= useState(false)
    const [firstSelectActive, setFirstSelectActive] = useState(false)
    const [secondSelectActive, setSecondSelectActive] = useState(false)
    const [images, setImages] = useState([])
    const [filesSend, setFilesSend] = useState([])
    const [location, setLocation] = useState(null)
    const [name_ru, setName_ru] =useState('')
    const [name_kk, setName_kk] =useState('')
    const [name_en, setName_en] =useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [volume, setVolume] = useState('')
    const [length, setLength] = useState('')

    const [goal_ru, setGoal_ru] = useState('')
    const [goal_kk, setGoal_kk] = useState('')
    const [goal_en, setGoal_en] = useState('')

    const [expectation_ru, setExpectation_ru] = useState('')
    const [expectation_kk, setExpectation_kk] = useState('')
    const [expectation_en, setExpectation_en] = useState('')

    const [description_ru, setDescription_ru] = useState('')
    const [description_kk, setDescription_kk] = useState('')
    const [description_en, setDescription_en] = useState('')

    const [water_spring_ru, setWater_spring_ru] = useState('')
    const [water_spring_kk, setWater_spring_kk] = useState('')
    const [water_spring_en, setWater_spring_en] = useState('')

    const [water_disposal_ru, setWater_disposal_ru] = useState('')
    const [water_disposal_kk, setWater_disposal_kk] = useState('')
    const [water_disposal_en, setWater_disposal_en] = useState('')

    const [technical_solution_ru, setTechnical_solution_ru] = useState('')
    const [technical_solution_kk, setTechnical_solution_kk] = useState('')
    const [technical_solution_en, setTechnical_solution_en] = useState('')

    const [water_presence_ru, setWater_presence_ru] = useState('')
    const [water_presence_kk, setWater_presence_kk] = useState('')
    const [water_presence_en, setWater_presence_en] = useState('')

    const [planner_ru, setPlanner_ru] = useState('')
    const [planner_kk, setPlanner_kk] = useState('')
    const [planner_en, setPlanner_en] = useState('')

    const [developer_ru, setDeveloper_ru] = useState('')
    const [developer_kk, setDeveloper_kk] = useState('')
    const [developer_en, setDeveloper_en] = useState('')

    const [responsible_person_ru, setResponsible_person_ru] = useState('')
    const [responsible_person_kk, setResponsible_person_kk] = useState('')
    const [responsible_person_en, setResponsible_person_en] = useState('')

    const [total_funding, setTotal_funding] = useState('')
    const [isMagistral, setIsMagistral] = useState(false)

    const [project_draft_ru, setProject_draft_ru] = useState(null)
    const [project_draft_kk, setProject_draft_kk] = useState(null)
    const [project_draft_en, setProject_draft_en] = useState(null)

    const [videoUrl1, setVideoUrl1] = useState('')
    const [videoUrl2, setVideoUrl2] = useState('')
    const [videoUrl3, setVideoUrl3] = useState('')
    const [videoUrl4, setVideoUrl4] = useState('')
    const [videoUrl5, setVideoUrl5] = useState('')

    const [objectsTypes, setObjectsTypes] = useState(null) 
    const [objectsStatus, setObjectsStatus] = useState(null) 

    const [isCorrectName_ru, setIsCorrectName_ru]= useState(true)
    const [isCorrectLocation, setIsCorrectLocation]= useState(true)
    const [isCorrectType, setIsCorrectType]= useState(true)
    const [isCorrectStatus, setIsCorrectStatus]= useState(true)

    useEffect(()=>{
        fetchObjectsTypes().then(data => setObjectsTypes(data.content[0]));
        fetchObjectsStatus().then(data => setObjectsStatus(data.content[0]))
    }, [])

    useEffect(()=>{
        if(id){
            fetchOneObjectByAdmin(id).then(data=>{
                data.content.name_ru && setName_ru(data.content.name_ru)
                data.content.name_kk && setName_kk(data.content.name_kk)
                data.content.name_en && setName_en(data.content.name_en)
                setType(data.content.type)
                if ((data.content.type.id === 2 || data.content.type.id === 3) && data.content.isMagistral === 1){
                    console.log(data.content.isMagistral)
                    setIsMagistral(true)
                }
                setStatus(data.content.status)
                data.content.location && setLocation(data.content.location)
                data.content.volume && setVolume(data.content.volume)
                data.content.photos && setImages(data.content.photos)
                data.content.goal_ru && setGoal_ru(data.content.goal_ru)
                data.content.goal_kk && setGoal_kk(data.content.goal_kk)
                data.content.goal_en && setGoal_en(data.content.goal_en)
                data.content.expectation_ru && setExpectation_ru(data.content.expectation_ru)
                data.content.expectation_kk && setExpectation_kk(data.content.expectation_kk)
                data.content.expectation_en && setExpectation_en(data.content.expectation_en)
                data.content.water_spring_ru && setWater_spring_ru(data.content.water_spring_ru)
                data.content.water_spring_kk && setWater_spring_kk(data.content.water_spring_kk)
                data.content.water_spring_en && setWater_spring_en(data.content.water_spring_en)
                data.content.water_disposal_ru && setWater_disposal_ru(data.content.water_disposal_ru)
                data.content.water_disposal_kk && setWater_disposal_kk(data.content.water_disposal_kk)
                data.content.water_disposal_en && setWater_disposal_en(data.content.water_disposal_en)
                data.content.technical_solution_ru && setTechnical_solution_ru(data.content.technical_solution_ru)
                data.content.technical_solution_kk && setTechnical_solution_kk(data.content.technical_solution_kk)
                data.content.technical_solution_en && setTechnical_solution_en(data.content.technical_solution_en)
                data.content.responsible_person_ru && setResponsible_person_ru(data.content.responsible_person_ru)
                data.content.responsible_person_kk && setResponsible_person_kk(data.content.responsible_person_kk)
                data.content.responsible_person_en && setResponsible_person_en(data.content.responsible_person_en)
                data.content.total_funding && setTotal_funding(data.content.total_funding)
                data.content.planner_ru && setPlanner_ru(data.content.planner_ru)
                data.content.planner_kk && setPlanner_kk(data.content.planner_kk)
                data.content.planner_en && setPlanner_en(data.content.planner_en)
                data.content.description_ru && setDeveloper_ru(data.content.description_ru)
                data.content.description_kk && setDeveloper_kk(data.content.description_kk)
                data.content.description_en && setDeveloper_en(data.content.description_en)
                if (data.content.video){
                    data.content.video[0] && setVideoUrl1(data.content.video[0])
                    data.content.video[1] && setVideoUrl2(data.content.video[1])
                    data.content.video[2] && setVideoUrl3(data.content.video[2])
                    data.content.video[3] && setVideoUrl4(data.content.video[3])
                    data.content.video[4] && setVideoUrl5(data.content.video[4])
                }
                data.content.project_draft_ru && setProject_draft_ru(data.content.project_draft_ru[0])
                data.content.project_draft_kk && setProject_draft_kk(data.content.project_draft_kk[0])
                data.content.project_draft_en && setProject_draft_en(data.content.project_draft_en[0])
            })
        }
    },[id])   


    function dragStartHandler(e){ e.preventDefault(); }
    function dragLeaveHandler(e){ e.preventDefault(); }
    function genUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        })
    }

    async function ondropHandler(e){
        e.preventDefault();
        if (images.length >=5) { return } // если изоб-ий больше 5 прервать
        let files = [...e.dataTransfer.files]
        if(files[0].size >= 5242880){ return } // если размер больше 5 мб прервать
        setFilesSend([...filesSend, files[0]])
        var reader = new FileReader();
        reader.onload = function (e) {
            let img = {id:genUUID(), url:e.target.result, type:files[0].type, name: files[0].name}
            setImages([...images, img] )
        }        
        reader.readAsDataURL(files[0]);
    }

    function validateFormData(){
        !name_ru ? setIsCorrectName_ru(false) : setIsCorrectName_ru(true)
        !location ? setIsCorrectLocation(false) : setIsCorrectLocation(true)
        !type ? setIsCorrectType(false) :setIsCorrectType(true)
        !status ? setIsCorrectStatus(false) : setIsCorrectStatus(true)
        if(!name_ru || !location || !type || !status){
            return false
        }
        return true
    }

    async function sendFormData(){
        if(!validateFormData()){
            return
        }
        const formData = new FormData()
        formData.append('name_ru', name_ru);
        name_kk && formData.append('name_kk', name_kk);
        name_en && formData.append('name_en', name_en);
        formData.append('type', type.id);
        if(location){
            formData.append(`location[lat]`, location["lat"]);
            formData.append(`location[lng]`, location["lng"]);
        }
        volume && formData.append('volume', volume);
        formData.append('status', status.id);
        if(type.id === 2 || type.id ===3 ){
            formData.append('isMagistral', isMagistral ? 1 : 0);
            formData.append('length', length)
        }
        total_funding && formData.append('total_funding', total_funding);

        goal_ru && formData.append('goal_ru', goal_ru);
        goal_kk && formData.append('goal_kk', goal_kk);
        goal_en && formData.append('goal_en', goal_en);

        expectation_ru && formData.append('expectation_ru', expectation_ru);
        expectation_kk && formData.append('expectation_kk', expectation_kk);
        expectation_en && formData.append('expectation_en', expectation_en);

        water_spring_ru && formData.append('water_spring_ru', water_spring_ru);
        water_spring_kk && formData.append('water_spring_kk', water_spring_kk);
        water_spring_en && formData.append('water_spring_en', water_spring_en);

        /*formData.append('description_ru', description_ru);
        formData.append('description_kk', description_kk);
        formData.append('description_en', description_en);*/

        water_disposal_ru && formData.append('water_disposal_ru', water_disposal_ru);
        water_disposal_kk && formData.append('water_disposal_kk', water_disposal_kk);
        water_disposal_en && formData.append('water_disposal_en', water_disposal_en);

        technical_solution_ru && formData.append('technical_solution_ru', technical_solution_ru);
        technical_solution_kk && formData.append('technical_solution_kk', technical_solution_kk);
        technical_solution_en && formData.append('technical_solution_en', technical_solution_en);

        water_presence_ru && formData.append('water_presence_ru', water_presence_ru);
        water_presence_kk && formData.append('water_presence_kk', water_presence_kk);
        water_presence_en && formData.append('water_presence_en', water_presence_en);

        planner_ru && formData.append('planner_ru', planner_ru);
        planner_kk && formData.append('planner_kk', planner_kk);
        planner_en && formData.append('planner_en', planner_en);

        developer_ru && formData.append('developer_ru', developer_ru);
        developer_kk && formData.append('developer_kk', developer_kk);
        developer_en && formData.append('developer_en', developer_en);

        responsible_person_ru &&formData.append('responsible_person_ru', responsible_person_ru);
        responsible_person_kk && formData.append('responsible_person_kk', responsible_person_kk);
        responsible_person_en && formData.append('responsible_person_en', responsible_person_en);

        videoUrl1 && formData.append('video[0]', videoUrl1);
        videoUrl2 && formData.append('video[1]', videoUrl2);
        videoUrl3 && formData.append('video[2]', videoUrl3);
        videoUrl4 && formData.append('video[3]', videoUrl4);
        videoUrl5 && formData.append('video[4]', videoUrl5);

        isMagistral && formData.append('isMagistral', 1) 

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
            if(project_draft_kk.id){
                let projectKkFormData = new FormData()
                projectKkFormData.append('file', project_draft_kk)
                let data = await uploadImage(projectKkFormData);
                formData.append(`project_draft_kk[0][url]`, data.content.value)
            }
            else{
                formData.append(`project_draft_kk[0][url]`, project_draft_kk.url)
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
        console.log("success")

        if(id){
            updateObject(123, formData).then(data => {console.log(data); setActive(true); setSuccess(true)});
        }else{
            createObject(formData).then(data=>{console.log("data ", data); setActive(true); setSuccess(true)}); 
        }   
      }

  return (
    <div className="create__object__page">
        {active ? <ResponseRequets success={success} setActive={setActive} /> : <></>}
        <div className="page__item">
            <Link to={OBJECTS_ROUTE}><MyButton variant="blue"><span className="button__left"> </span>Назад</MyButton></Link>
            <div className="page__subtitle">{id ? "Редактирование" : "Создание"} объекта</div>
        </div>
        <div className="page__form">
            <div className="label">Название (на русском) *</div>
            <input className={isCorrectName_ru ? "input" : "input input-error"} type="text" value={name_ru} onChange={(e)=>setName_ru(e.target.value)}></input>
            {isCorrectName_ru ? <></> : <div className="label error-label">Поле "Название" обязательно для заполнения</div>}

            <div className="label">Название (на казахском) *</div>
            <input className="input" type="text" value={name_kk} onChange={(e)=>setName_kk(e.target.value)}></input>
            <div className="label">Название (на английском) *</div>
            <input className="input" type="text" value={name_en} onChange={(e)=>setName_en(e.target.value)}></input>
            <div className="object__page__selections">
                <div className="page__select_parent">
                    <div className="label">Тип объекта *</div>
                    <div className={isCorrectType ? "object__page_select" : "object__page_select select-error"}>
                        <p className="select__value">{type.name}</p>
                        {type ? <span className="select-cross" onClick={()=>{setType('')}}>&#10006;</span>: ""}
                        <span className="select-line"></span>
                        <div onClick={()=>setFirstSelectActive(!firstSelectActive)} className={firstSelectActive ? "select-icon select-icon-active": "select-icon"}></div>
                    </div>
                    {objectsTypes ? <MySelect active={firstSelectActive} setActive={setFirstSelectActive} options={objectsTypes} 
                    setSelectedItem={setType}></MySelect> : <></>}
                    {isCorrectType ? <></> : <div className="label error-label">Поле "Тип" обязательно для заполнения</div>}
                </div>
                <div className="page__select_parent">
                    <div className="label">Статус объекта *</div>
                    <div className={isCorrectStatus ? "object__page_select" : "object__page_select select-error"}>
                        <p className="select__value">{status.name}</p>
                        {status ? <span onClick={()=>{setStatus('');}} className="select-cross">&#10006;</span> : ""}
                        <span className="select-line"></span>
                        <div onClick={()=>setSecondSelectActive(!secondSelectActive)} className={secondSelectActive ? "select-icon select-icon-active": "select-icon"} ></div>
                    </div>
                    {objectsStatus ? <MySelect active={secondSelectActive} setActive={setSecondSelectActive} options={objectsStatus} 
                    setSelectedItem={setStatus}></MySelect> :<></>}
                    {isCorrectStatus ? <></> : <div className="label error-label">Поле "Статус" обязательно для заполнения</div>}
                </div>
            </div>

            {type.id ===2 || type.id ===3 ? <> <input type="checkbox" checked={isMagistral} onChange={()=>setIsMagistral(!isMagistral)} className="custom-checkbox" id="happy"/>
            <label htmlFor="happy">Магистральный</label></> :<></>}

            <div className="label">Местоположение *</div>
            <MapComponent location={location} setLocation={setLocation}/>
            {isCorrectLocation ? <></> : <div className="label error-label">Вы не выбрали Местоположение</div>}

            <div className="label">{type.id === 2 || type.id ===3 ? "Водоотдача":"Объем" } (м<sup><small>3</small></sup>) *</div>
            <input className="input" type="text" value={volume} onChange={(e)=>setVolume(e.target.value)}></input>

            {type.id ===2 || type.id ===3 ? <><div className="label">Протяженность (км)</div>
            <input className="input" type="text" value={length} onChange={(e)=>setLength(e.target.value)}></input></>:<></>}
            
            <div className="label">Фотографии *</div>
            <div className="img__upload"
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e=>ondropHandler(e)}>
                <p>
                    .jpg, .png <br/> Не более 5МБ
                </p>
            </div>
            {images.length ? images.map(img =>
                <ImgCart key={genUUID()} images={images} setImages={setImages} image={img}/>
            ): <></>}
            <div className="label">Ссылки на YouTube (макс. 5)</div>
            <div className="youtube-div">
                <input className="input" type="text" value={videoUrl1} onChange={(e)=>setVideoUrl1(e.target.value)}></input>
                <input className="input" type="text" value={videoUrl2} onChange={(e)=>setVideoUrl2(e.target.value)}></input>
                <input className="input" type="text" value={videoUrl3} onChange={(e)=>setVideoUrl3(e.target.value)}></input>
                <input className="input" type="text" value={videoUrl4} onChange={(e)=>setVideoUrl4(e.target.value)}></input>
                <input className="input" type="text" value={videoUrl5} onChange={(e)=>setVideoUrl5(e.target.value)}></input>
            </div>

            <div className="tiny__container">
                <TinyComponent text="Задача объекта (на русском)" item={goal_ru} setItem={setGoal_ru}/>
                <TinyComponent text="Задача объекта (на казахском)" item={goal_kk} setItem={setGoal_kk}/>
                <TinyComponent text="Задача объекта (на английском)" item={goal_en} setItem={setGoal_en}/>
                <TinyComponent text="Ожидаемый результат (на русском)" item={expectation_ru} setItem={setExpectation_ru}/>
                <TinyComponent text="Ожидаемый результат (на казахском)" item={expectation_kk} setItem={setExpectation_kk}/>
                <TinyComponent text="Ожидаемый результат (на английском)" item={expectation_en} setItem={setExpectation_en}/>
                <TinyComponent text="Источник воды (на русском)" item={water_spring_ru} setItem={setWater_spring_ru}/>
                <TinyComponent text="Источник воды  (на казахском)" item={water_spring_kk} setItem={setWater_spring_kk}/>
                <TinyComponent text="Источник воды  (на английском)" item={water_spring_en} setItem={setWater_spring_en}/>
                <TinyComponent text="Водоотведение (на русском)" item={water_disposal_ru} setItem={setWater_disposal_ru}/>
                <TinyComponent text="Водоотведение (на казахском)" item={water_disposal_kk} setItem={setWater_disposal_kk}/>
                <TinyComponent text="Водоотведение (на английском)" item={water_disposal_en} setItem={setWater_disposal_en}/>
                <TinyComponent text="Техническое решение (на русском)" item={technical_solution_ru} setItem={setTechnical_solution_ru}/>
                <TinyComponent text="Техническое решение (на казахском)" item={technical_solution_kk} setItem={setTechnical_solution_kk}/>
                <TinyComponent text="Техническое решение (на английском)" item={technical_solution_en} setItem={setTechnical_solution_en}/>
            </div>
            <p className="tiny-container-title">Заказчик</p>
            <div className="tiny__container">
                <TinyComponent text="Ответственное лицо (на русском)" item={responsible_person_ru} setItem={setResponsible_person_ru}/>
                <TinyComponent text="Ответственное лицо (на казахском)" item={responsible_person_kk} setItem={setResponsible_person_kk}/>
                <TinyComponent text="Ответственное лицо (на английском)" item={responsible_person_en} setItem={setResponsible_person_en}/>
                <TinyComponent className="tiny-full-screen" text="Объем финансирования" item={total_funding} setItem={setTotal_funding}/>
                <TinyComponent text="Проектировщик (на русском)" item={planner_ru} setItem={setPlanner_ru}/>
                <TinyComponent text="Проектировщик (на казахском)" item={planner_kk} setItem={setPlanner_kk}/>
                <TinyComponent text="Проектировщик (на английском)" item={planner_en} setItem={setPlanner_en}/>
                <TinyComponent text="Застройщик (на русском)" item={developer_ru} setItem={setDeveloper_ru}/>
                <TinyComponent text="Застройщик (на казахском)" item={developer_kk} setItem={setDeveloper_kk}/>
                <TinyComponent text="Застройщик (на английском)" item={developer_en} setItem={setDeveloper_en}/>
            </div>
            <div className="draft__photo">
                <ImgUpload text="Эскизный проект (на русском) (макс. 1)" image={project_draft_ru} setImage={setProject_draft_ru}/>
                <ImgUpload text="Эскизный проект (на казахском) (макс. 1)" image={project_draft_kk} setImage={setProject_draft_kk}/>
                <ImgUpload text="Эскизный проект (на английском) (макс. 1)" image={project_draft_en} setImage={setProject_draft_en}/>
            </div>
            <div className="line"></div>
            <div className="page__buttons">
                <MyButton variant="border red" type="button">Отмена</MyButton>
                <MyButton variant="green" onClick={sendFormData} type="button">Сохранить</MyButton>
            </div>
        </div>
    </div>
  )
}

export default CreateObject