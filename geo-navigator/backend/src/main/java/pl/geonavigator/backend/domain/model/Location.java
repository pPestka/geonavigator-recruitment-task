package pl.geonavigator.backend.domain.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private boolean visiblState;
    private double imputValueGeodesicY;
    private double imputValueGeodesicX;
    private double geodesicY;
    private double geodesicX;
    private String latitudeBDecimal;
    private String longitudeLDecimal;
    private String latitudeBDegreeMinutesSeconds;
    private String longitudeLDegreeMinutesSeconds;
    private String linkToGoogleMaps;

    public Location() {
    }

    public Location(boolean visiblState, double imputValueGeodesicY, double imputValueGeodesicX, double geodesicY, double geodesicX, String latitudeBDecimal, String longitudeLDecimal, String latitudeBDegreeMinutesSeconds, String longitudeLDegreeMinutesSeconds, String linkToGoogleMaps) {
        this.visiblState = visiblState;
        this.imputValueGeodesicY = imputValueGeodesicY;
        this.imputValueGeodesicX = imputValueGeodesicX;
        this.geodesicY = geodesicY;
        this.geodesicX = geodesicX;
        this.latitudeBDecimal = latitudeBDecimal;
        this.longitudeLDecimal = longitudeLDecimal;
        this.latitudeBDegreeMinutesSeconds = latitudeBDegreeMinutesSeconds;
        this.longitudeLDegreeMinutesSeconds = longitudeLDegreeMinutesSeconds;
        this.linkToGoogleMaps = linkToGoogleMaps;
    }

    public long getId() {
        return id;
    }

    public boolean isVisiblState() {
        return visiblState;
    }

    public double getImputValueGeodesicY() {
        return imputValueGeodesicY;
    }

    public double getImputValueGeodesicX() {
        return imputValueGeodesicX;
    }

    public double getGeodesicY() {
        return geodesicY;
    }

    public double getGeodesicX() {
        return geodesicX;
    }

    public String getLatitudeBDecimal() {
        return latitudeBDecimal;
    }

    public String getLongitudeLDecimal() {
        return longitudeLDecimal;
    }

    public String getLatitudeBDegreeMinutesSeconds() {
        return latitudeBDegreeMinutesSeconds;
    }

    public String getLongitudeLDegreeMinutesSeconds() {
        return longitudeLDegreeMinutesSeconds;
    }

    public String getLinkToGoogleMaps() {
        return linkToGoogleMaps;
    }
    public void setId(long id) {
        this.id = id;
    }
}
