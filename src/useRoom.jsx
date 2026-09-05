import { joinRoom } from 'trystero'
import { useEffect, useRef } from 'preact/hooks'

export const useRoom = (roomConfig, roomId) => {
    const roomRef = useRef(joinRoom(roomConfig, roomId))
    const lastRoomIdRef = useRef(roomId)

    useEffect(() => {
        if (roomId !== lastRoomIdRef.current) {
            roomRef.current.leave()
            roomRef.current = joinRoom(roomConfig, roomId)
            lastRoomIdRef.current = roomId
        }

        return () => roomRef.current.leave()
    }, [roomConfig, roomId])

    return roomRef.current
}