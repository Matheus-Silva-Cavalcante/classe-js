export default class Repository{
    _itemsArray = [];
    _mapper;
    _storageKey;
    _id = 0;

    constructor(mapper, storageKey){        
        this._mapper = mapper;
        this._storageKey = storageKey;
        this._loadData();
    }

    _generateId(){
        this._id++;  
        return this._id;
    }

    _loadData(){
        if(localStorage.getItem(this._storageKey)){
            this._itemsArray = JSON.parse(localStorage.getItem(this._storageKey));
            this._id = this._itemsArray.length - 1;
        }
    }

    _saveData(){
        localStorage.setItem(this._storageKey, JSON.stringify(this._itemsArray));
    }

    add(item){
        const id = this._generateId();
        item.id = id;
        const dto = this._mapper.convertToDTO(item);
        this._itemsArray[id] = dto;
        this._saveData();
    }

    get(id){
        const dto = this._itemsArray[id];
        if(!dto) return null
        const entity = this._mapper.convertToEntity(dto);
        
        return entity;
    }

    delete(index){
        delete this._itemsArray[index];
        this._saveData();
    }

    list(){        
        return this._itemsArray.filter((item) => item).map( (item) => {        
            const entity = this._mapper.convertToEntity(item);

            return entity;
        });
    }
}