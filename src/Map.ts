export interface Mappable {
    location: {
        lat: number
        lng: number
    },
    name: string,
    markerContent(): string
}

export class Map {
    googleMap: google.maps.Map

    constructor(HTMLElementId: string) {
        const mapElement: HTMLElement | null = document.querySelector(HTMLElementId)
        if (!mapElement) {
            return
        }
        this.googleMap = new google.maps.Map(mapElement, { 
            zoom: 1,
            center: {
                lat: 0,
                lng: 0
            }
        })
    }

    addMarker(mappable: Mappable): void {
        const { location: { lat, lng }, name } = mappable
        

        const marker = new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: lat,
                lng: lng
            }
        })
        marker.addListener('click', () => {
            var infoWindow = new google.maps.InfoWindow({
                content: mappable.markerContent()
            })

            infoWindow.open(this.googleMap, marker)
        })
    }
}