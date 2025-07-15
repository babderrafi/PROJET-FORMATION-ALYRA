package com.nftcar.alyra.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.nftcar.alyra.domain.NFTLevel} entity.
 */
public class NFTLevelDTO implements Serializable {

    private Long id;

    @NotNull
    private String niveau;

    @NotNull
    private Integer seuilLocation;

    @NotNull
    private BigDecimal tauxFrais;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public Integer getSeuilLocation() {
        return seuilLocation;
    }

    public void setSeuilLocation(Integer seuilLocation) {
        this.seuilLocation = seuilLocation;
    }

    public BigDecimal getTauxFrais() {
        return tauxFrais;
    }

    public void setTauxFrais(BigDecimal tauxFrais) {
        this.tauxFrais = tauxFrais;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NFTLevelDTO)) {
            return false;
        }

        NFTLevelDTO nFTLevelDTO = (NFTLevelDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, nFTLevelDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NFTLevelDTO{" +
            "id=" + getId() +
            ", niveau='" + getNiveau() + "'" +
            ", seuilLocation=" + getSeuilLocation() +
            ", tauxFrais=" + getTauxFrais() +
            "}";
    }
}
