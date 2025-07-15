package com.nftcar.alyra.service.dto;

import com.nftcar.alyra.domain.enumeration.StatutContrat;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.nftcar.alyra.domain.RentalContract} entity.
 */
public class RentalContractDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant dateDebut;

    @NotNull
    private Instant dateFin;

    @NotNull
    private StatutContrat statut;

    @NotNull
    private BigDecimal fraisAppliques;

    private VehicleDTO vehicle;

    private UserExtendedDTO locataire;

    private UserExtendedDTO loueur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Instant getDateFin() {
        return dateFin;
    }

    public void setDateFin(Instant dateFin) {
        this.dateFin = dateFin;
    }

    public StatutContrat getStatut() {
        return statut;
    }

    public void setStatut(StatutContrat statut) {
        this.statut = statut;
    }

    public BigDecimal getFraisAppliques() {
        return fraisAppliques;
    }

    public void setFraisAppliques(BigDecimal fraisAppliques) {
        this.fraisAppliques = fraisAppliques;
    }

    public VehicleDTO getVehicle() {
        return vehicle;
    }

    public void setVehicle(VehicleDTO vehicle) {
        this.vehicle = vehicle;
    }

    public UserExtendedDTO getLocataire() {
        return locataire;
    }

    public void setLocataire(UserExtendedDTO locataire) {
        this.locataire = locataire;
    }

    public UserExtendedDTO getLoueur() {
        return loueur;
    }

    public void setLoueur(UserExtendedDTO loueur) {
        this.loueur = loueur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RentalContractDTO)) {
            return false;
        }

        RentalContractDTO rentalContractDTO = (RentalContractDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, rentalContractDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RentalContractDTO{" +
            "id=" + getId() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", statut='" + getStatut() + "'" +
            ", fraisAppliques=" + getFraisAppliques() +
            ", vehicle=" + getVehicle() +
            ", locataire=" + getLocataire() +
            ", loueur=" + getLoueur() +
            "}";
    }
}
