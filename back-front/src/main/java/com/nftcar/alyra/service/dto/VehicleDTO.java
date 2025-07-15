package com.nftcar.alyra.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.nftcar.alyra.domain.Vehicle} entity.
 */
public class VehicleDTO implements Serializable {

    private Long id;

    @NotNull
    private String marque;

    @NotNull
    private String modele;

    private String description;

    @NotNull
    private BigDecimal tarifJournalier;

    @NotNull
    private Boolean disponible;

    private UserExtendedDTO loueur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getTarifJournalier() {
        return tarifJournalier;
    }

    public void setTarifJournalier(BigDecimal tarifJournalier) {
        this.tarifJournalier = tarifJournalier;
    }

    public Boolean getDisponible() {
        return disponible;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
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
        if (!(o instanceof VehicleDTO)) {
            return false;
        }

        VehicleDTO vehicleDTO = (VehicleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, vehicleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VehicleDTO{" +
            "id=" + getId() +
            ", marque='" + getMarque() + "'" +
            ", modele='" + getModele() + "'" +
            ", description='" + getDescription() + "'" +
            ", tarifJournalier=" + getTarifJournalier() +
            ", disponible='" + getDisponible() + "'" +
            ", loueur=" + getLoueur() +
            "}";
    }
}
