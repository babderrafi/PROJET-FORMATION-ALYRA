package com.nftcar.alyra.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A NFTLevel.
 */
@Entity
@Table(name = "nft_level")
public class NFTLevel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "niveau", nullable = false)
    private String niveau;

    @NotNull
    @Column(name = "seuil_location", nullable = false)
    private Integer seuilLocation;

    @NotNull
    @Column(name = "taux_frais", precision = 21, scale = 2, nullable = false)
    private BigDecimal tauxFrais;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public NFTLevel id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNiveau() {
        return this.niveau;
    }

    public NFTLevel niveau(String niveau) {
        this.setNiveau(niveau);
        return this;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public Integer getSeuilLocation() {
        return this.seuilLocation;
    }

    public NFTLevel seuilLocation(Integer seuilLocation) {
        this.setSeuilLocation(seuilLocation);
        return this;
    }

    public void setSeuilLocation(Integer seuilLocation) {
        this.seuilLocation = seuilLocation;
    }

    public BigDecimal getTauxFrais() {
        return this.tauxFrais;
    }

    public NFTLevel tauxFrais(BigDecimal tauxFrais) {
        this.setTauxFrais(tauxFrais);
        return this;
    }

    public void setTauxFrais(BigDecimal tauxFrais) {
        this.tauxFrais = tauxFrais;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NFTLevel)) {
            return false;
        }
        return id != null && id.equals(((NFTLevel) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NFTLevel{" +
            "id=" + getId() +
            ", niveau='" + getNiveau() + "'" +
            ", seuilLocation=" + getSeuilLocation() +
            ", tauxFrais=" + getTauxFrais() +
            "}";
    }
}
