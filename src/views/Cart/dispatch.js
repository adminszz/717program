import { UPDATE_GOODS_COUNT } from '../../store/reducers'
export default function mapDispatchToProps (dispath) {
    return {
        updateCount (count,id) {
            dispath ({
                type:UPDATE_GOODS_COUNT,
                data:count,
                id
            })
        }
    }
}