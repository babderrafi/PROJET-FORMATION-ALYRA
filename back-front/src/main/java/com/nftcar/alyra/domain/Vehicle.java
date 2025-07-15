package com.nftcar.alyra.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Vehicle.
 */
@Entity
@Table(name = "vehicle")
public class Vehicle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "marque", nullable = false)
    private String marque;

    @NotNull
    @Column(name = "modele", nullable = false)
    private String modele;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "tarif_journalier", precision = 21, scale = 2, nullable = false)
    private BigDecimal tarifJournalier;

    @NotNull
    @Column(name = "disponible", nullable = false)
    private Boolean disponible;

    @ManyToOne
    @JsonIgnoreProperties(value = { "vehicles", "rentalContractsAsLocataires", "rentalContractsAsLoueurs" }, allowSetters = true)
    private UserExtended loueur;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Vehicle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarque() {
        return this.marque;
    }

    public Vehicle marque(String marque) {
        this.setMarque(marque);
        return this;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getModele() {
        return this.modele;
    }

    public Vehicle modele(String modele) {
        this.setModele(modele);
        return this;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getDescription() {
        return this.description;
    }

    public Vehicle description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getTarifJournalier() {
        return this.tarifJournalier;
    }

    public Vehicle tarifJournalier(BigDecimal tarifJournalier) {
        this.setTarifJournalier(tarifJournalier);
        return this;
    }

    public void setTarifJournalier(BigDecimal tarifJournalier) {
        this.tarifJournalier = tarifJournalier;
    }

    public Boolean getDisponible() {
        return this.disponible;
    }

    public Vehicle disponible(Boolean disponible) {
        this.setDisponible(disponible);
        return this;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }

    public UserExtended getLoueur() {
        return this.loueur;
    }

    public void setLoueur(UserExtended userExtended) {
        this.loueur = userExtended;
    }

    public Vehicle loueur(UserExtended userExtended) {
        this.setLoueur(userExtended);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vehicle)) {
            return false;
        }
        return id != null && id.equals(((Vehicle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Vehicle{" +
            "id=" + getId() +
            ", marque='" + getMarque() + "'" +
            ", modele='" + getModele() + "'" +
            ", description='" + getDescription() + "'" +
            ", tarifJournalier=" + getTarifJournalier() +
            ", disponible='" + getDisponible() + "'" +
            "}";
    }
}
